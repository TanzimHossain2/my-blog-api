const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined', 'blocked'],
    }

}, { timestamps: true });

const User = model('User', UserSchema);

module.exports = User;