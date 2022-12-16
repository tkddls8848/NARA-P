const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    user_id: {
        type: String,
        unique: true
    },
    user_pw: {
        type: String,
        required: true
    },
    e_mail: {
        type: String,
        required: false
    }
}, {versionKey: false})

module.exports = mongoose.model('userlists', userSchema)