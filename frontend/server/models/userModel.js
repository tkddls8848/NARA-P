const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    id: {
        type: String,
        unique: true
    },
    pw: String,
    email: {
        type: String,
        required: false
    }
}, {versionKey: false})

module.exports = mongoose.model('userlists', userSchema)