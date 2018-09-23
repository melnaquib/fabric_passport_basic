FROM hyperledger/composer-rest-server:0.20.0

RUN npm install -g --production loopback-connector-mongodb passport-http && \
    npm cache clean --force && \
    ln -s node_modules .node_modules

COPY custom-http.js node_modules/custom-http.js

COPY .composer /home/composer/.composer
