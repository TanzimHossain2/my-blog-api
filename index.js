require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const PORT = process.env.PORT || 4000;

const Article = require('./models/Article');


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
        const sortType = req.query.sort_type || 'desc';
        const sortBy = req.query.sort_by || 'updatedAt';
        const searchTerm = req.query.search || '';

        // 2. call article service to fetch all articles
        const articleInstance = new Article();
        await articleInstance.init();
        let articles;

        // filter by search term
        if (searchTerm) {
            articles = await articleInstance.search(searchTerm);
        } else {
            articles = await articleInstance.find();
        }

        // sort articles
        articles = await articleInstance.sort(articles, sortType, sortBy);
        // paginate articles
        const {
            result,
            totalItems,
            totalPage,
            hasNext,
            hasPrev
        } = await articleInstance.pagination(articles, page, limit);

        articles = result;
        
        // 3. generate necessary response
        articles = articles.map(article => {

            const transformed = { ...article };
            transformed.author = {
                id: transformed.authorId,
                //Todo
            }
            transformed.link = `/articles/${transformed.id}`;

            delete transformed.body;
            delete transformed.authorId;

            return transformed;
        })

        const response = {
            data: articles,
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
