require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const PORT = process.env.PORT || 4000;

const Article = require('./models/Article');
const articleService = require('./services/article');


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

    // get all articles
    .get(async (req, res) => {

        // 1. extract query params
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;

        // 2. call article service to get articles
        let { articles, totalItems, totalPage, hasNext, hasPrev } = await articleService.findArticles({ ...req.query, page, limit });

        // 3. generate necessary response
        articlesResponse = articleService.transFromArticles({ articles })

        const response = {
            data: articlesResponse,
            pagination: {
                page,
                limit,
                totalPage,
                totalItems
            },
            links: {
                self: req.originalUrl,
            }
        }

        if (hasPrev) {
            response.pagination.prev = page - 1;
            response.links.prev = `/articles?page=${page - 1}&limit=${limit}`;
        }

        if (hasNext) {
            response.pagination.next = page + 1;
            response.links.next = `/articles?page=${page + 1}&limit=${limit}`;
        }

        res.status(200).json(response);
    })
    // create new article
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
