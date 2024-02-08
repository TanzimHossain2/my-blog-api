const { Article } = require('../../model');
const defaults = require('../../config/defaults');

const findAll = async ({
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search
}) => {

    const sortStr = `${sortType === 'dsce' ? '-' : ''}${sortBy}`;

    const filter = {
        title: new RegExp(search, 'i')
    };
    const articles = await Article.find(filter)
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit)
        .populate({
            path: 'author',
            select: 'name email'

        });


    return articles.map(article => ({
        ...article._doc,
        id: article._id,
    }));
};

const count = ({ search = '' }) => {
    const filter = {
        title: new RegExp(search, 'i')
    };

    return Article.countDocuments(filter);
};

const findSingleItem = async ({ id, expand = '' }) => {
    if (!id) throw new Error('Id is required');

    expand = expand.split(',').map(item => item.trim());

    const article = await Article.findById(id);
    if (expand.includes('author')) {
        await article.populate({
            path: 'author',
            select: 'name id'
        });
    }
    if (expand.includes('comment')) {
        await article.populate({
            path: 'comments',
        });
    }

    return {
        ...article._doc,
        id: article._id,
    };

};

module.exports = {
    findAll,
    count,
    findSingleItem
};