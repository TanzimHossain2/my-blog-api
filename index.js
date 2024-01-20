require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const OpenApiValidator = require('express-openapi-validator');

// PORT
const PORT = process.env.PORT || 4000;

// db 
const databaseConnection = require('./db');

// services
const articleService = require('./services/article');


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

// Article routes
app.route('/api/v1/articles')

    // get all articles
    .get(async (req, res) => {
        // 1. extract query params
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const sortType = req.query.sort_type || 'desc';
        const sortBy = req.query.sort_by || 'updatedAt';
        const searchTerm = req.query.search || '';

        // 2. call article service to get articles
        let { articles, totalItems, totalPage, hasNext, hasPrev } = await articleService.findArticles({
            page,
            limit,
            sortType,
            sortBy,
            searchTerm
        });

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
            response.links.prev = `${req.url}?page=${page - 1}&limit=${limit}`;
        }

        if (hasNext) {
            response.pagination.next = page + 1;
            response.links.next = `${req.url}?page=${page + 1}&limit=${limit}`;
        }

        res.status(200).json(response);
    })

    // create new article
    .post(async (req, res) => {
        // step 1: destruct request body
        const { title, body, cover, status } = req.body;

        // step 2: invoke the service function
        const newArticle = await articleService.createNewArticle({ title, body, cover, status, authorId: req.user.id });

        // step 3: generate response 
        const response = {
            code: 201,
            message: 'Article created successfully!',
            data: newArticle,
            links: {
                self: `${req.url}/${newArticle.id}`,
                author: `${req.url}/${newArticle.id}/author`,
                comments: `${req.url}/${newArticle.id}/comments`
            }
        }

        res.status(201).json(response);
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


// Error handler
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});


(async () => {
    // connect to db
    console.log('Connecting to database...');
    try {
        await databaseConnection.getDB();
        console.log('Connected to database successfully!');
    } catch (err) {
        console.log(err);
    }

    // start server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }
    );


})();


