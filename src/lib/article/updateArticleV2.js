/* eslint-disable indent */
const { Article } = require('../../model');
const { notFound, badRequest } = require('../../utils/error');

//This path is restricted and should not be updated
const restrictedPath = ['id', '_id', 'author', 'createdAt', 'updatedAt'];

const updateArticleV2 = async (id, operations = []) => {
    const article = await Article.findById(id);
    if (!article) {
        throw notFound();
    }

    for (let operation of operations) {
        const { op, path, value } = operation;
        if (restrictedPath.includes(path)) {
            throw badRequest(`Path ${path} is restricted`);
        }

        switch (op) {
            case 'replace': {
                replace(article, path, value);
                break;
            }
            case 'add': {
                article.set(path, value);
                break;
            }
            // case 'remove': {
            //     delete article[path];
            //     break;
            // }
            default:
                throw badRequest(`Operation ${op} is not supported`);
        }
    }
    await article.save();
    return article._doc;
};

const replace = (document, path, value) => {
    document[path] = value;

};

module.exports = updateArticleV2;