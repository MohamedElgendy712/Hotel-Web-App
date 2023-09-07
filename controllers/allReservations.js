const Reservation = require('../models/reservation')

module.exports = (req , res , next) => {

    Reservation.find()
    .then((reservations) => {

        res.statusCode = 200
        res.setHeader('content-type' , 'application/json')
        res.json(reservations)
    })
    .catch((err) => console.log(err));
}