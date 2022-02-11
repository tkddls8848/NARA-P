const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    id: String,
    pw: String
}, {versionKey: false})

module.exports = mongoose.model('userlists', userSchema)