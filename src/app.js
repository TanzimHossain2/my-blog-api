const express = require('express');
const applyMiddleware = require('./middleware');

// Routes
const routers = require('./routes');

// express app
const app = express();

// middlewares
applyMiddleware(app);

app.use(routers);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send({
        status: 'OK',
        user: req.user
    });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

module.exports = app;






