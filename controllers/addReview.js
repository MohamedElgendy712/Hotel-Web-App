const Reservation = require('../models/reservation')

module.exports = (req , res , next) => {

    Reservation.findById(req.params.reservationId)
    .then((reservation) => {

        if (reservation){

            let review = {
                userId : req.session.userId,
                reviewBody : req.body.reviewBody,
            }

            reservation.reviews.push(review)

            reservation.save()
            .then((reservation) =>{
                res.statusCode = 200
                res.setHeader("content-type" , "application/json")
                res.json(reservation)
            })

        }else{

            err = new Error("Reservation " + req.session.userId + "is not found")
            err.status = 404
            return next(err)
            
        }
    })
    .catch((err) => console.log(err))
}

