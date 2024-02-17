const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined', 'blocked'],
        default: 'pending'
    }

}, { timestamps: true });

const User = model('User', UserSchema);

module.exports = User;