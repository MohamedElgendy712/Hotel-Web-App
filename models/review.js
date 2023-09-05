const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewBody: String,
    datePost:{
        type: Date,
        default: new Date()
    }
})

module.exports = reviewSchema;