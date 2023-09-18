const User = require('../models/user')

module.exports = (req , res , next) => {
    console.log(req.session);
    if (req.session.userId){

        User.findById(req.session.userId)
        .populate("favorite")
        .populate("reservations")
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