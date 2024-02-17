const registerService = require('../../../../lib/auth');
const { generateToken } = require('../../../../lib/token');

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await registerService({ name, email, password });

        // Access token
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        const accessToken = generateToken({ payload });

        const response = {
            code: 201,
            message: 'Signup successful',
            data: {
                access_token: accessToken,
            },
            links: {
                self: req.url,
                login: '/auth/login'
            }
        };

        res.status(201).json(response);

    } catch (e) {
        next(e);
    }
};

module.exports = register;