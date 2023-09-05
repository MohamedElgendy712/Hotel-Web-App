const mongoose = require('mongoose')
const Schema = mongoose.Schema

const review = require('./review')



const reservationSchema = new Schema({
    type : String,

    title: String,

    rating: String,

    location: String,

    price: String,

    images: Array,

    propertyHighlights: Array,

    description: Array,

    facilities: Array,

    reviews: [review]
})

const Reservation = mongoose.model('reservation' , reservationSchema)

module.exports = Reservation;