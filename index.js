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

    // get all articles
    .get(async (req, res) => {

        // 1. extract query params
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const sortType = req.query.sort_type || 'desc';
        const sortBy = req.query.sort_by || 'updatedAt';
        const searchTerm = req.query.search || '';

        // 2. call article service to fetch all articles
        const db = await connection.getDB();
        let articles = db.articles;


        // filter by search term
        if (searchTerm) {
            try {
                articles = articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
            } catch (error) {
                console.log(error);
            }
        }

        // sort articles
        articles.sort((a, b) => {
            if (sortType === 'asc') {
                return a[sortBy].toString().localeCompare(b[sortBy].toString());
            }
            return b[sortBy].toString().localeCompare(a[sortBy].toString());
        });

        // paginate articles
        const skip = limit * page - limit;
        let resultedArticles = articles.slice(skip, skip + limit);
        const totalItems = articles.length;
        const totalPage = Math.ceil(totalItems / limit);


        // 3. generate necessary response
        resultedArticles = resultedArticles.map(article => {

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
            data: resultedArticles,
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

        if (page > 1) {
            response.pagination.prev = page - 1;
            response.links.prev = `/articles?page=${page - 1}&limit=${limit}`;
        }

        if (page < totalPage) {
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
