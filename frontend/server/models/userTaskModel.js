const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const schema = mongoose.Schema

const userTaskSchema = new schema({
    user_id: String,
    task_type: String,
    task_title: String
}, {versionKey:false})

userTaskSchema.plugin(AutoIncrement, {inc_field: 'content_number'})

module.exports = mongoose.model('usertasklists', userTaskSchema)