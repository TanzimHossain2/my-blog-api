require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const PORT = process.env.PORT || 4000;

// Database connection
const connection = require('./db');


// express app
const app = express();
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
// Health check route
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'OK' });
});

// Article routes
app.route('/api/v1/articles')
    .get(async (req, res) => {
        // 1. extract query params
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const sortType = req.query.sort_type || 'desc';
        const sortBy = req.query.sort_by || 'updatedAt';
        const searchTerm = req.query.search || '';

        // 2. call article service to fetch all articles
        const db = await connection.getDB();
        console.log(db);

        // 3. generate necessary response


        res.status(200).send({ path: '/articles', method: 'GET' });
    })
    .post((req, res) => {
        res.status(200).send({ path: '/articles', method: 'POST' });
    });

app.route('/api/v1/articles/:id')
    .get((req, res) => {
        res.status(200).send({ path: `/articles/${req.params.id}`, method: 'GET' });
    })
    .put((req, res) => {
        res.status(200).send({ path: `/articles/${req.params.id}`, method: 'PUT' });
    })
    .patch((req, res) => {
        res.status(200).send({ path: `/articles/${req.params.id}`, method: 'PATCH' });
    })
    .delete((req, res) => {
        res.status(200).send({ path: `/articles/${req.params.id}`, method: 'DELETE' });
    });

// Auth routes
app.route('/api/v1/auth/signup')
    .post((req, res) => {
        res.status(200).send({ path: '/auth/signup', method: 'POST' });
    });

app.route('/api/v1/auth/signin')
    .post((req, res) => {
        res.status(200).send({ path: '/auth/signin', method: 'POST' });
    });


// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}
);
