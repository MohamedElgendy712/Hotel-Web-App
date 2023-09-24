const Reservation = require('../models/reservation.js')

module.exports = (req , res , next) => {

    Reservation.find({_id : req.params.id})
    .populate("reviews.userId")
    .then((hotel) => {
        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json(hotel)
    })
    .catch((err) => console.log(err))
}