const User = require('../models/user')

module.exports = (req , res , next) => {
    User.findById(req.session.userId)
    .then((user) =>{

        if (user != null){

            user.favorite.push(req.params.reservationId)
            user.save()
            .then((user) => {

                res.statusCode = 200
                res.setHeader("content-type" , "application/json")
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