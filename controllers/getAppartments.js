const Reservation = require('../models/reservation')

module.exports = (req , res , next) => {
    Reservation.find({type: "appartment"})
    .limit(req.query.len)
    .then((appartments) => {
        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json(appartments)
    })
    .catch((err) => console.log(err))
}