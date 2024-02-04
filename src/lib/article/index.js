const { Article } = require('../../model');

const findAll = async ({ page = 1, limit = 10, sortType = 'desc', sortBy = 'updateAt', search = '' }) => {
    const sortStr = `${sortType === 'desc' ? '-' : ''}${sortBy}`;
    console.log(sortStr);

    const articles = await Article.find({
        title: new RegExp(search, 'i')
    }).sort(sortStr)
        .skip(page * limit - limit).limit(limit)

    return articles;


}

module.exports = { findAll };