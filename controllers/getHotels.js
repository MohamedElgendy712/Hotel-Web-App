const Reservation = require('../models/reservation')

module.exports = (req , res , next) => {
    console.log("home" , req.session)
    Reservation.find({type: "hotel"})
    .limit(req.query.len)
    .then((hotels) => {
        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json(hotels)
    })
    .catch((err) => console.log(err))
}