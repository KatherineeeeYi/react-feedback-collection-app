const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String
});

// telling mongoose to create a collection called users
mongoose.model('users', userSchema);