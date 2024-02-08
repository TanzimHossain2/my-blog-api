const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const swaggerDocument = YAML.load('./swagger.yaml');
const express = require('express');
const authenticate = require('./authenticate');

const applyMiddleware = (app) => {
    app.use(express.json());
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use(
        OpenApiValidator.middleware({
            apiSpec: './swagger.yaml',
        }),
    );

    //todo remove later
    app.use(authenticate);
};

module.exports = applyMiddleware;