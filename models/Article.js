const connection = require("../db");

class Article {
    constructor() {
        this.articles = [];
    }

    async init() {
        const db = await connection.getDB();
        this.articles = db.articles;
    }

    async find() {
        return this.articles;
    }

    async findById(id) {
        const item = this.articles.find(article => article.id === id);
        return item;
    }

    async findByProps(props) {
        return this.articles.find(article => article[props] === props);
    }

    async search(term) {
        return this.articles.filter(article => article.title.toLowerCase().includes(term.toLowerCase()));
    }

    async sort(articles, sortType = "asc", sortBy = "updatedAt") {
        let result;
        if (sortType === 'asc') {
            result = await this.#sortAsc(articles, sortBy);
        }
        else {
            result = await this.#sortDesc(articles, sortBy);
        }
        return result;
    }

    async #sortAsc(articles, sortBy) {
        return articles.sort((a, b) => a[sortBy].toString().localeCompare(b[sortBy].toString()));
    }

    async #sortDesc(articles, sortBy) {
        return articles.sort((a, b) => b[sortBy].toString().localeCompare(a[sortBy].toString()));
    }

    async pagination(articles, page, limit) {

        const skip = limit * page - limit;
        const totalItems = articles.length;
        const totalPage = Math.ceil(totalItems / limit);
        const result = articles.slice(skip, skip + limit);

        return {
            result,
            totalItems,
            totalPage,
            hasNext: page < totalPage,
            hasPrev: page > 1
        }
    }


}

module.exports = Article;