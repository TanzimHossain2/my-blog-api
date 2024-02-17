const ArticleService = require('../../../../lib/article');


const updateItemPatch = async (req, res, next) => {
    try {
        const id = req.params.id;
        const article = await ArticleService.updateArticleV2(id, req.body);
        console.log(article);
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }

};

module.exports = updateItemPatch;