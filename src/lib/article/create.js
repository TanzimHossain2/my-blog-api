const { Article } = require('../../model');

const create = async ({ title, body = '', cover = '', status = 'draft', author }) => {

    if (!title || !author) {
        const error = new Error('Invalid input');
        error.statusCode = 400;
        throw error;
    }

    const article = new Article({
        title,
        body,
        cover,
        status,
        author: author.id
    });

    return await article.save();

};

module.exports = create;