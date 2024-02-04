const articleService = require('../../../../lib/article');
const { param } = require('../../../../routes');


const generateQueryString = (query) => {
    return Object.keys(query)
        .map(key => (
            encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        ))
        .join('&');

}

const findAll = async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sortType = req.query.sort_type || 'desc';
    const sortBy = req.query.sort_by || 'updateAt';
    const search = req.query.search || '';

    try {
        const articles = await articleService.findAll({ page, limit, sortType, sortBy, search });

        /* response Generation */

        //data 
        const data = articles.map(article => ({
            ...article._doc,
            link: {
                self: `${req.protocol}://${req.get('host')}${req.path}/${article._id}`
            }
        }))

        //pagination
        const totalItems = await articleService.count({ search });
        const totalPages = Math.ceil(totalItems / limit);
        const pagination = {
            page,
            limit,
            totalItems,
            totalPages,

        }

        if (page < totalPages) {
            pagination.next = page + 1;
        }

        if (page > 1) {
            pagination.prev = page - 1;
        }

        //Links
        const links = {
            self: req.path
        }

        if (pagination.next) {
            const query = generateQueryString({ ...req.query, page: pagination.next });

            links.next = `${req.path}?${query}`;

        }

        if (pagination.prev) {

            const query = generateQueryString({ ...req.query, page: pagination.prev });
            links.prev = `${req.path}?${query}`;
        }


        res.status(200).json({ data, pagination, links });

    } catch (err) {
        next(err);
    }

}

module.exports = findAll;