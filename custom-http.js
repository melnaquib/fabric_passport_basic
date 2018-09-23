throw "__ANY_THING____"; 
console.error("__BasicStrategy__");
console.warn(BasicStrategy);

var passport = require('passport')
var BasicStrategy = require('passport-basic').Strategy;
console.error("__BasicStrategy__");
console.error("__BasicStrategy__");
console.error("__BasicStrategy__");
console.error("__BasicStrategy__");
console.error("__BasicStrategy__");
console.warn(BasicStrategy);
console.warn(typeof(BasicStrategy));
console.warn(BasicStrategy.keys());


var users = {"u1": "p1", "u2": "p2", "u3": "p3"};

passport.use(new BasicStrategy(
  function(username, password, done) {
    var ok = users[username] == password;
    return ok ? done(null, username) :
    done(null, false, { message: 'Incorrect username and/or password.' });
    });
  }
));
