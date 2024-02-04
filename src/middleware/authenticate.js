const authenticate = (req, res, next) => {
    req.user = {
        id: '65b64c0714b92e6dbf2623e0',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        role: 'user',
    }
    next();
}

module.exports = authenticate;