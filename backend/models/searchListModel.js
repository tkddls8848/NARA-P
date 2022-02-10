const mongoose = require('mongoose')
const schema = mongoose.Schema

const searchListSchema = new schema({
    departname: String,
    beginDate: Date,
    endDate: Date
}, {versionKey: false})

module.exports = mongoose.model('searchlist', searchListSchema)