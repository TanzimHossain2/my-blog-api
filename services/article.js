const Article = require("../models/Article");
const databaseConnection = require('../db');
const { request } = require("express");

const findArticles = async ({ page = 1, limit = 5, sortType = 'dsce', sortBy = 'updatedAt', searchTerm = "" }) => {
    //get articles from db
    const articleInstance = new Article(databaseConnection.db.articles);

    let articles;

    // filter by search term
    if (searchTerm) {
        articles = await articleInstance.search(searchTerm);
    } else {
        articles = await articleInstance.find();
    }


    // sort articles
    articles = await articleInstance.sort(articles, sortType, sortBy);

    // paginate articles
    const { result, totalItems, totalPage, hasNext, hasPrev } = await articleInstance.pagination(articles, page, limit);

    return {
        articles: result,
        totalItems,
        totalPage,
        hasNext,
        hasPrev
    }
}

const transFromArticles = ({ articles = [] }) => {
    return articles.map(article => {
        const transformed = { ...article };

        transformed.author = {
            id: transformed.authorId,
            //Todo find author name - authorService
        }

        transformed.link = `/articles/${transformed.id}`;

        delete transformed.body;
        delete transformed.authorId;

        return transformed;
    })
}

const createNewArticle = async ({ title, body, authorId, cover = '', status = 'draft' }) => {
    const articleInstance = new Article(databaseConnection.db.articles);
    const newArticle = await articleInstance.create({ title, body, authorId, cover, status }, databaseConnection);
    return newArticle;
}

module.exports = {
    findArticles,
    transFromArticles,
    createNewArticle
}