const User = require('../models/user')

module.exports = (req , res , next) => {

    console.log("innn");

    User.findById(req.session.userId)
    .then((user) => {

        if (user){

            user.reservations.push(req.params.reservationId)
            user.save()
            .then((user) => {
                res. statusCode = 200
                res.end()
            })
            
        }else{

            err = new Error("User " + req.session.userId + "is not found")
            err.status = 404
            return next(err)

        }
    })
    .catch((err) => console.log(err))

}