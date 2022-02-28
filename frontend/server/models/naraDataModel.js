const mongoose = require('mongoose')
const schema = mongoose.Schema

const dataSchema = new schema({
    depart_name: String,
    task_type: String,
    task_data: Object
}, {versionKey: false})

module.exports = mongoose.model('naraData' , dataSchema)