const User = require('../models/user')

module.exports = (req , res , next) => {
   
    if (req.session.userId){

        User.findById(req.session.userId)
        .populate("favorite")
        .populate("reservations.reservationId")
        .then((user) => {
            res.statusCode = 200
            res.setHeader("contetn-type" , "application/json")
            res.json(user)
        })
        .catch((err) => console.log(err))
    }else{

        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json(null)
    }
}