const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const schema = mongoose.Schema

const userTaskSchema = new schema({
    UserId: String,
    TaskType: String,
    TaskTitle: String
}, {versionKey:false})

userTaskSchema.plugin(AutoIncrement, {inc_field: 'contentNumber'})

module.exports = mongoose.model('usertasklists', userTaskSchema)