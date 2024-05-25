const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    resetPasswordToken: String, 
    resetPasswordExpires: Date,
    date: {
        type: Date,
        default: Date.now
    },
    completedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

});

module.exports = mongoose.model('User', userSchema);
