const { Article } = require('../../model');

const findAll = ({ page = 1, limit = 10, sortType = 'dsce', sortBy = 'updateAt', search = '' }) => {

    const sortStr = `${sortType === 'dsce' ? '-' : ''}${sortBy}`;
    const filter = {
        title: new RegExp(search, 'i')
    };

    return Article.find(filter)
        .sort(sortStr)
        .skip(page * limit - limit)
        .limit(limit)
        .populate({
            path: 'author',
            select: 'name email'

        })

}

const count = ({ search = '' }) => {
    const filter = {
        title: new RegExp(search, 'i')
    };

    return Article.countDocuments(filter);
}

module.exports = {
    findAll,
    count
};