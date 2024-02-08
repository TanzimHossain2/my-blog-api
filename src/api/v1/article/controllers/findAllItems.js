const articleService = require('../../../../lib/article');
const { query } = require('../../../../utils');
const defaults = require('../../../../config/defaults');

const findAllItems = async (req, res, next) => {
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;
    const search = req.query.search || defaults.search;

    try {
        const articles = await articleService.findAll({ page, limit, sortType, sortBy, search });

        /* response Generation */

        //data 
        const data = query.getTransFormedItems({
            items: articles,
            path: '/articles',
            selection: ['id', 'title', 'author', 'cover', 'createdAt', 'updatedAt'],
        });

        //pagination
        const totalItems = await articleService.count({ search });
        const pagination = query.getPagination({ totalItems, limit, page });

        //Links
        const links = query.getHeatOsForAllItems({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next, /* !! converts the value to boolean */
            hasPrev: !!pagination.prev,
            page
        });

        res.status(200).json({ data, pagination, links });

    } catch (err) {
        next(err);
    }

};

module.exports = findAllItems;