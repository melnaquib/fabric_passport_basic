COMPOSER_CARD=admin@tutorial-network
COMPOSER_NAMESPACES=never
COMPOSER_AUTHENTICATION=true
COMPOSER_MULTIUSER=true
export COMPOSER_PROVIDERS='{
  "basic": {
    "provider": "basic",
    "module": "passport-http",
    "strategy": "BasicStrategy",
    "clientID": "",
    "clientSecret": "",
    "authPath": "/auth/local",
    "callbackURL": "/auth/local/callback",
    "successRedirect": "/",
    "failureRedirect": "/login"
   }
}'
COMPOSER_DATASOURCES='{
  "db": {
    "name": "db",
    "connector": "mongodb",
    "host": "mongo"
  }
}'
