const fs = require('fs/promises');
const path = require('path');

class DatabaseConnection {
    constructor(dbURL) {
        this.db = null;
        this.dbURL = dbURL;
    }

    async connect() {
        try {
            const dbStr = await fs.readFile(this.dbURL, { encoding: 'utf-8' });
            this.db = JSON.parse(dbStr);

        } catch (err) {
            console.log(err);
        }
    }

    async write() {
        try {
            if (this.db) {
                await fs.writeFile(this.dbURL, JSON.stringify(this.db));
            }

        } catch (err) {
            console.log(err);
        }
    }

    async getDB() {
        if (this.db) {
            return this.db;
        }
        await this.connect();
        return this.db;
    }
}



const location = path.resolve(process.env.DB_URL);
// const location1 = path.join(__dirname, process.env.DB_URL1);


const databaseConnection = new DatabaseConnection(location);

module.exports = databaseConnection;