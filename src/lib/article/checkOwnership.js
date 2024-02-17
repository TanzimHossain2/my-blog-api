const { Article } = require('../../model');
const { notFound } = require('../../utils/error');

const checkOwnership = async ({ resourceId, userId }) => {
    const article = await Article.findById(resourceId);
    if (!article) {
        throw notFound();
    }

    if (article._doc.author.toString() === userId) {
        return true;
    }

    return false;
};

module.exports = checkOwnership;