const mongoose = require('mongoose')
const schema = mongoose.Schema

const searchLogicSchema = new schema({
    departname: String,
    taskType: String,
    dateRange: Array
}, {versionKey: false})

module.exports = mongoose.model('searchlogics', searchLogicSchema)