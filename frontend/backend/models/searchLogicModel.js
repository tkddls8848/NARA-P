const mongoose = require('mongoose')
const schema = mongoose.Schema

const searchLogicSchema = new schema({
    depart_name: String,
    task_type: String,
    date_range: Array
}, {versionKey: false})

module.exports = mongoose.model('searchlogics', searchLogicSchema)