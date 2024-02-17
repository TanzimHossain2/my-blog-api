const router = require('express').Router();
const { controllers: articleController } = require('../api/v1/article');
const { controllers: articleControllerV2 } = require('../api/v2/article');
const { controllers: authControllers } = require('../api/v1/authentication');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const ownership = require('../middleware/ownership');


//Auth routes

router
    .post('/api/v1/auth/register', authControllers.register)
    .post('/api/v1/auth/login', authControllers.login);

//Article routes
router.
    route('/api/v1/articles')
    .get(articleController.findAllItems)
    .post(authenticate, authorize(['admin', 'user']), articleController.create);

router
    .route('/api/v1/articles/:id')
    .get(articleController.findSingleItem)
    .put(authenticate, articleController.updateItem)
    .patch(authenticate, articleController.updateItemPatch)
    .delete(authenticate, authorize(['admin', 'user']), ownership('Article'), articleController.removeItem);

router
    .route('/api/v2/articles/:id')
    .patch(authenticate, articleControllerV2.updateItemPatch);


module.exports = router;