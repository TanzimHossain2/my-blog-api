const { Article } = require('../../model');
const { notFound } = require('../../utils/error');
const create = require('./create');

const updateOrCreate = async (id, { title, body,
    author, cover = '', status = '', }) => {

    const article = await Article.findById(id);

    if (!article) {
        const newArticle = await create({ title, body, author, cover, status });
        return {
            code: 201,
            article: newArticle
        };
    }
    const UpdateArticle = {
        title,
        body,
        author: author.id,
        cover,
        status
    };

    article.overwrite(UpdateArticle);
    await article.save();

    return {
        code: 200,
        article: { ...article._doc, id: article.id }
    };
};

const updateProperties = async (id, { title, body, cover, status }) => {
    const article = await Article.findById(id);

    if (!article) {
        notFound();
    }

    const updatedArticle = { title, body, cover, status };

    Object.keys(updatedArticle).forEach((key) => {
        if (updatedArticle[key] !== undefined) {
            article[key] = updatedArticle[key] ?? article[key];
        }
    });


    await article.save();

    return { ...article._doc, id: article.id };

};



module.exports = { updateOrCreate, updateProperties };