
class Article {
    constructor(articles) {
        this.articles = articles;
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
        try {
            if (sortType === 'asc') {
                result = await this.#sortAsc(articles, sortBy);
            } else {
                result = await this.#sortDesc(articles, sortBy);
            }
        } catch (error) {
            console.error(`Error sorting articles: ${error.message}`);
            result = articles; // Return the original array in case of an error
        }
        return result;
    }

    async #sortAsc(articles, sortBy) {
        return articles.toSorted((a, b) => {
            const valueA = this.#getFieldValue(a, sortBy);
            const valueB = this.#getFieldValue(b, sortBy);

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return valueA - valueB;
            } else {
                // Case-insensitive string comparison
                return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            }
        });
    }

    async #sortDesc(articles, sortBy) {
        return articles.toSorted((a, b) => {
            const valueA = this.#getFieldValue(a, sortBy);
            const valueB = this.#getFieldValue(b, sortBy);

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return valueB - valueA;
            } else {
                // Case-insensitive string comparison
                return valueB.toLowerCase().localeCompare(valueA.toLowerCase());
            }
        });
    }

    #getFieldValue(item, field) {
        // Convert to number if the field represents numeric data
        return item && typeof item[field] !== 'undefined' ? (isNaN(item[field]) ? item[field] : Number(item[field])) : null;
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

    //article Create

    async create(article, databaseConnection) {

        const newArticle = {
            id: this.articles.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...article
        }

        this.articles.push(newArticle);
        databaseConnection.db.articles = this.articles;
        await databaseConnection.write();
        return newArticle;
    }


}

module.exports = Article;