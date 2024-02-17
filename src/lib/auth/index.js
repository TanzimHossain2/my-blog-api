const { userExist, createUser } = require('../user');
const { badRequest } = require('../../utils/error');
const { generateHash } = require('../../utils/hashing');

const registerService = async ({ name, email, password }) => {
    const hasUser = await userExist(email);

    if (hasUser) {
        throw badRequest('User already exist');
    }

    const hashedPassword = await generateHash(password);
    const user = await createUser({ name, email, password: hashedPassword });

    return user;

};

module.exports = registerService;