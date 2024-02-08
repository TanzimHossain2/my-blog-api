require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./db');

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// Connect to DB and start server
const main = async () => {
    await connectDB();

    server.listen(PORT, async () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

main();