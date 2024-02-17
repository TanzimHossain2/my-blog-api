const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const swaggerDocument = YAML.load('./swagger.yaml');
const express = require('express');
const authenticate = require('./authenticate');
const morgan = require('morgan');

const applyMiddleware = (app) => {
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use(
        OpenApiValidator.middleware({
            apiSpec: './swagger.yaml',
        }),
    );

};

module.exports = applyMiddleware;