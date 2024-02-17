const tokenService = require('../lib/token');
const userService = require('../lib/user');
const { authenticationError, authorizationError } = require('../utils/error');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(authenticationError('Token is required'));
    }

    try {
        const decoded = tokenService.verifyToken({ token });
        const user = await userService.findUserByEmail(decoded.email);

        if (!user) {
            return next(authenticationError());
        }

        if (user.status !== 'approved') {
            return next(authorizationError(`Your account is  ${user.status}`));
        }

        req.user = { ...user._doc, id: user.id };

        next();

    } catch (error) {
        return next(authenticationError());
    }


};

module.exports = authenticate;