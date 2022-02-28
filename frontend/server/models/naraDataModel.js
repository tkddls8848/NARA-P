const mongoose = require('mongoose')
const schema = mongoose.Schema

const dataSchema = new schema({
    departname: String,
    taskType: String,
    data: Object
}, {versionKey: false})

module.exports = mongoose.model('naraData' , dataSchema)