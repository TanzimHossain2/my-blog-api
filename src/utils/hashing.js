const bcrypt = require('bcryptjs');

const generateHash = async (payload, saltRound = 10) => {
    const salt = await bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(payload, salt);
    return hash;
};

const hashMatched = async (raw, hash) => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};

module.exports = {
    generateHash,
    hashMatched
};