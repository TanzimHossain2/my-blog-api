const login = (req, res, next) => {
    try {
        res.send('login');

    } catch (e) {
        next(e);
    }
};

module.exports = login;