const jwt = require('jsonwebtoken');
const { serverError } = require('../../utils/error');

const privateKey = process.env.ACCESS_TOKEN_SECRET;

const generateToken = ({ payload, algorithm = 'HS256', secret = privateKey, expiresIn = '1h' }) => {
    try {
        return jwt.sign(payload, secret, { algorithm, expiresIn });
    } catch (e) {
        console.log(`JWT Error: ${e}`);
        throw serverError();
    }
};

const decodeToken = ({ token, algorithm = 'HS256' }) => {
    try {
        return jwt.decode(token, algorithm);
    } catch (e) {

        throw serverError();
    }
};

const verifyToken = ({ token, algorithm = 'HS256', secret = privateKey }) => {
    try {
        return jwt.verify(token, secret, { algorithms: [algorithm] });
    } catch (e) {
        console.log(`JWT Error: ${e}`);
        throw serverError();
    }
};



module.exports = {
    generateToken,
    decodeToken,
    verifyToken
};