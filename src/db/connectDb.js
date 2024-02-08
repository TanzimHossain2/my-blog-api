const mongoose = require('mongoose');

let connectionURL = process.env.DB_CONNECTION_URL;
connectionURL = connectionURL.replace('<username>', process.env.DB_USER_NAME);
connectionURL = connectionURL.replace('<password>', process.env.DB_PASSWORD);
// connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectionURL, {
            dbName: process.env.DB_NAME,
        });
        console.log('DB connected successfully');
        return conn;
    } catch (error) {
        console.log('Error connecting to DB');
        console.log(error);
    }
};

module.exports = connectDB;