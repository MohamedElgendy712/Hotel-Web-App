const User = require('../models/user')

module.exports = (req , res , next) =>{
    User.create(req.body)
    .then((user) =>{
        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json({"status" : "Success operation"})
    })
    .catch((err) =>{
        let signupFormErrors = Object.keys(err.errors).map(key => err.errors[key].message)
        res.json(signupFormErrors)
    })
}