const authenticate = (req, res, next) => {
    req.user = {
        id: 999,
        name: 'John Doe'
    }
    next();
}

module.exports = authenticate;