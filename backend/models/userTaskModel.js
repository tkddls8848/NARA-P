const mongoose = require('mongoose')
const schema = mongoose.Schema

const userTaskSchema = new schema({
    UserId: String,
    TaskType: String,
    TaskData: Object
}, {versionKey:false})

module.exports = mongoose.model('usertasklists', userTaskSchema)