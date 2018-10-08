COMPOSER_CARD=admin@tutorial-network
COMPOSER_NAMESPACES=never
COMPOSER_AUTHENTICATION=true
COMPOSER_MULTIUSER=true
COMPOSER_PROVIDERS='{
  "local": {
    "provider": "local",
    "module": "passport-local",
    "usernameField": "username",
    "passwordField": "password",
    "authPath": "/auth/local",
    "callbackURL":"/auth/local/callback",
    "successRedirect": "/",
    "failureRedirect": "/",
    "setAccessToken": true,
    "callbackHTTPMethod": "post"
  }
}'
COMPOSER_DATASOURCES='{
  "db": {
    "name": "db",
    "connector": "mongodb",
    "host": "mongo"
  }
}'
