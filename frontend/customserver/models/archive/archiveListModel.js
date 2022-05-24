const mongoose = require('mongoose')
const schema = mongoose.Schema

const archiveListSchema = new schema({
    depart_name: String,
    task_type: String,
    //특정 조건의 데이터 아카이브 있는지 여부
    date_range: Array
}, {versionKey: false})

module.exports = mongoose.Model('archivelists', archiveListSchema)