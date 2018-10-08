// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-component-passport
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

var SG = require('strong-globalize');
var g = SG();

var loopback = require('loopback');
var passport = require('passport');
var _ = require('underscore');

module.exports = PassportConfigurator;


var strategy;
switch (authType) {
case 'ldap':
strategy = new AuthStrategy(_.defaults({
  usernameField: options.usernameField || 'username',
  passwordField: options.passwordField || 'password',
  session: options.session, authInfo: true,
  passReqToCallback: true,
}, options),
  function(req, user, done) {
    if (user) {
      var LdapAttributeForUsername = options.LdapAttributeForUsername || 'cn';
      var LdapAttributeForMail = options.LdapAttributeForMail || 'mail';
      var externalId = user[options.LdapAttributeForLogin || 'uid'];
      var email = [].concat(user[LdapAttributeForMail])[0];
      var profile = {
        username: [].concat(user[LdapAttributeForUsername])[0],
        id: externalId,
      };
      if (!!email) {
        profile.emails = [{value: email}];
      }
      var OptionsForCreation = _.defaults({
        autoLogin: true,
      }, options);
      self.userIdentityModel.login(provider, authScheme, profile, {},
        OptionsForCreation, loginCallback(req, done));
    } else {
      done(null);
    }
  }
);
break;
case 'local':
strategy = new AuthStrategy(_.defaults({
  usernameField: options.usernameField || 'username',
  passwordField: options.passwordField || 'password',
  session: options.session, authInfo: true,
}, options),
  function(username, password, done) {
    var query = {
      where: {
        or: [
          {username: username},
          {email: username},
        ],
      },
    };
    self.userModel.findOne(query, function(err, user) {
      if (err)
        return done(err);

      var errorMsg = g.f('Invalid username/password or email has not been verified');
      if (user) {
        var u = user.toJSON();
        delete u.password;
        var userProfile = {
          provider: 'local',
          id: u.id,
          username: u.username,
          emails: [
            {
              value: u.email,
            },
          ],
          status: u.status,
          accessToken: null,
        };

        // If we need a token as well, authenticate using Loopbacks
        // own login system, else defer to a simple password check
        //will grab user info from providers.json file.  Right now
        //this only can use email and username, which are the 2 most common
        var login = function(creds) {
          self.userModel.login(creds,
            function(err, accessToken) {
              if (err) {
                return err.code === 'LOGIN_FAILED' ?
                    done(null, false, {message: g.f('Failed to create token.')}) :
                    done(err);
              }
              if (accessToken && user.emailVerified) {
                userProfile.accessToken = accessToken;
                done(null, userProfile, {accessToken: accessToken});
              } else {
                done(null, false, {message: g.f('Failed to create token.')});
              }
            });
        };
        if (options.setAccessToken) {
          switch (options.usernameField) {
            case  'email':
              login({email: username, password: password});
              break;
            case 'username':
              login({username: username, password: password});
              break;
          }
        } else {
          return user.hasPassword(password, function(err, ok) {
            // Fail to login if email is not verified or invalid username/password.
            // Unify error message in order not to give indication about the error source for
            // security purposes.
            if (ok && user.emailVerified)
              return done(null, userProfile);

            done(null, false, {message: errorMsg});
          });
        }
      } else {
        done(null, false, {message: errorMsg});
      }
    });
  }
);
break;


case 'saml':
strategy = new AuthStrategy(_.defaults({
  passReqToCallback: true,
}, options),
  function(req, profile, done) {
    if (link) {
      if (req.user) {
        self.userCredentialModel.link(req.user.id, name, authScheme,
          profile, {}, options, done);
      } else {
        done('No user is logged in');
      }
    } else {
      self.userIdentityModel.login(name, authScheme, profile, {},
        options, loginCallback(req, done));
    }
  }
);
break;
default:
strategy = new AuthStrategy(_.defaults({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL,
  passReqToCallback: true,
}, options),
  function(req, accessToken, refreshToken, profile, done) {
    if (link) {
      if (req.user) {
        self.userCredentialModel.link(
          req.user.id, provider, authScheme, profile,
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
          }, options, done);
      } else {
        done(g.f('No user is logged in'));
      }
    } else {
      self.userIdentityModel.login(provider, authScheme, profile,
        {accessToken: accessToken, refreshToken: refreshToken},
        options, loginCallback(req, done));
    }
  }
);
}
