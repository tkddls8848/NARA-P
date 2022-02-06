const mongoose = require('mongoose')
const schema = mongoose.Schema

const dataSchema = new schema({
    type: String,
    data: {
        title: String,
        date: Date
    }
})

module.exports = mongoose.model('naraData' , dataSchema)