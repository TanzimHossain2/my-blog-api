const { model, Schema } = require('mongoose');

const articleSchema = new Schema({
    title: String,
    body: String,
    cover: String,
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, strict: false });

const Article = model('Article', articleSchema);

module.exports = Article;