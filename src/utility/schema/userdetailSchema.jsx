const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : String,
    password : String
})
export const User = mongoose.models.users ||  mongoose.model('users', userSchema)