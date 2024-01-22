require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const OpenApiValidator = require('express-openapi-validator');
const mongoose = require('mongoose');

// PORT
const PORT = process.env.PORT || 4000;

// Models
const User = require('./model/User');

// express app
const app = express();

// middlewares
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(
    OpenApiValidator.middleware({
        apiSpec: './swagger.yaml',
    }),
);

app.use((req, res, next) => {
    req.user = {
        id: 999,
        name: 'John Doe'
    }
    next();
})


// routes

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'OK' });
});


// Error handler
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// connect to DB

let connectionURL = process.env.DB_CONNECTION_URL;
connectionURL = connectionURL.replace('<username>', process.env.DB_USER_NAME);
connectionURL = connectionURL.replace('<password>', process.env.DB_PASSWORD);
connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;

mongoose.connect(connectionURL, {
    connectTimeoutMS: 5000,
})
    .then(() => {
        console.log('DB connected successfully');

        // start the server
        app.listen(PORT, async () => {
            console.log(`Server running on http://localhost:${PORT}`);
        }
        );
    })
    .catch((err) => {
        console.log('Error connecting to DB');
        console.log(err);
    });






