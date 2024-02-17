const { authorizationError } = require('../utils/error');
const articleService = require('../lib/article');

const ownership = (model = '') => async (req, res, next) => {

    if (model === 'Article') {
        console.log(req.params.id, 'req.params.id');
        const isOwner = await articleService.checkOwnership({ resourceId: req.params.id, userId: req.user.id });
        console.log(isOwner, 'isOwner');

        if (isOwner) {
            return next();
        }

        return next(authorizationError());
    }



};

module.exports = ownership;