const User = require('../models/user')

module.exports = (req , res , next) => {

    User.findById(req.session.userId)
    .then((user) => {

        if(user){

            let reservationIndex = user.reservations.map(reservation => reservation.reservationId).lastIndexOf(req.params.reservationI)
            user.reservations.splice(reservationIndex , 1)

            user.save()
            .then((user) => {
                user.populate("favorite")
                .then(user => {
                    user.populate("reservations.reservationId")
                    .then(user =>{
                        res. statusCode = 200
                        res.json(user)
                    })
                    
                })
                
            })
        }else{

            err = new Error("User " + req.session.userId + "is not found")
            err.status = 404
            return next(err)

        }
    })
    .catch((err) => console.log(err))
}