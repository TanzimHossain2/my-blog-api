const { findAll, count, findSingleItem } = require('./findAll');
const create = require('./create');
const { updateOrCreate, updateProperties } = require('./Update');
const removeItem = require('./remove');
const updateArticleV2 = require('./updateArticleV2');


module.exports = { findAll, count, create, findSingleItem, updateOrCreate, updateProperties, removeItem, updateArticleV2 };