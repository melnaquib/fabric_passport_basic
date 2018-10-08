source envvars_http.sh
docker rm rest
docker build -t localhost/composer-rest-server .
docker run -e COMPOSER_CARD=${COMPOSER_CARD}     -e COMPOSER_NAMESPACES=${COMPOSER_NAMESPACES}     -e COMPOSER_AUTHENTICATION=${COMPOSER_AUTHENTICATION}     -e COMPOSER_MULTIUSER=${COMPOSER_MULTIUSER}     -e COMPOSER_PROVIDERS="${COMPOSER_PROVIDERS}"     -e COMPOSER_DATASOURCES="${COMPOSER_DATASOURCES}"     --name rest     --network composer_default     -p 3000:3000     localhost/composer-rest-server
