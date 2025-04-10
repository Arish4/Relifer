const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{type: String, require:true},
    email:{type: String, require:true, unique: true},
    password:{type:String, require:true}
});

//Hashing

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

module.exports = mongoose.model('User', UserSchema)

