const mongoose = require('mongoose')
const schema = mongoose.Schema

const archiveDataSchema = new schema({
    depart_name: String,
    task_type: String,
    date: String,
    //특정일 공고데이터 모음(여러개일 수 있음)
    task_data: Object
}, {versionKey: false})

module.exports = mongoose.model('archives', archiveDataSchema)