const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const PORT = process.env.PORT || 4000;


// express app
const app = express();
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK'
    })
})

app.get('/api/v1/articles', (req, res) => {
    console.log('URL: ', req.url);
    console.log("Query: ", req.query);

    res.status(200).json({
        message: "Hello Swagger"
    })
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}
);
