const { userExist, createUser, findUserByEmail } = require('../user');
const { badRequest } = require('../../utils/error');
const { generateHash, hashMatched } = require('../../utils/hashing');
const { generateToken } = require('../token');

const register = async ({ name, email, password }) => {
    const hasUser = await userExist(email);

    if (hasUser) {
        throw badRequest('User already exist');
    }

    const hashedPassword = await generateHash(password);
    const user = await createUser({ name, email, password: hashedPassword });

    return user;

};

const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw badRequest('Invalid credentials');
    }

    const match = await hashMatched(password, user.password);

    if (!match) {
        throw badRequest('Invalid credentials');
    }

    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };

    return generateToken({ payload });

};

module.exports = { register, login };