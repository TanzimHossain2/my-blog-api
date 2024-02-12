const { Article } = require('../../model');

/**
 *  Create article
 * @param {Object} param0
 * @returns 
 */
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

    await article.save();

    return {
        ...article._doc,
        id: article._id,
    };

};

module.exports = create;