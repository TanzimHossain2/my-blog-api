const { Article } = require('../../model');
const { notFound } = require('../../utils/error');

const removeItem = async (id) => {
    const article = await Article.findById(id);

    if (!article) {
        notFound();
    }

    return Article.findByIdAndDelete(id);

};

module.exports = removeItem;