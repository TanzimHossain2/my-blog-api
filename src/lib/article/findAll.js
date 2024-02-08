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

module.exports = {
    findAll,
    count
};