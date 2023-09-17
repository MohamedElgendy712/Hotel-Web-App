const Reservation = require('../models/reservation')

module.exports = (req , res , next) => {
    
    if (req.session.userId){

        Reservation.findById(req.session.userId)
        .then((user) => {
            res.statusCode = 200
            res.setHeaders("content-type" , "application/json")
            res.json(user)
        })
        .catch((err) => console.log(err))
    }else{

        res.statusCode = 200
        res.setHeaders("content-type" , "application/json")
        res.json(null)
    }
}