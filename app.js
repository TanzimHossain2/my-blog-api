require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const OpenApiValidator = require('express-openapi-validator');

// PORT
const PORT = process.env.PORT || 4000;

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


// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}
);





