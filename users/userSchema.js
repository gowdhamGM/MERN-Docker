const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
        required: true 
    },
    empId: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['emp', 'hr', 'admin'],
        required: true
    }
});

module.exports = mongoose.model("User",UserSchema);
