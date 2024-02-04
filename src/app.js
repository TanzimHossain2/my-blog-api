const express = require('express');
const mongoose = require('mongoose');
const applyMiddleware = require('./middleware');

// Models
const User = require('./model/User');

// express app
const app = express();

// middlewares
applyMiddleware(app);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send({
        status: 'OK',
        user: req.user
    });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

module.exports = app;






