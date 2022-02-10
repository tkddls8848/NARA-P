const mongoose = require('mongoose')
const schema = mongoose.Schema

const dataSchema = new schema({
    type: String,
    data: Object
}, {versionKey: false})

module.exports = mongoose.model('naraData' , dataSchema)