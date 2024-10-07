const { Schema, model } = require('mongoose');

// schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;