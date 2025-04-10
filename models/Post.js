const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
user:{type:mongoose.Schema.ObjectId, ref: 'User', require:true},
content:{type:String, require:true, maxLength: 500},
createdAt:{type:Date,default:Date.now}

});

module.exports = mongoose.model('Post', postSchema)