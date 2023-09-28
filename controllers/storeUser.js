const User = require('../models/user')
const bcrypt = require('bcrypt')




module.exports = (req , res , next) =>{

    

    bcrypt.hash(req.body.password , 10)
    .then(hashedPassword => {
        
        req.body.password = hashedPassword

    })
    .then(() => {
        
        User.create(req.body)
        .then((user) =>{
            res.statusCode = 200
            res.setHeader("content-type" , "application/json")
            res.json({"status" : "Success operation"})
        })
        .catch((err) =>{
            let signupFormErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            res.statusCode = 500
            res.setHeader("content-type" , "application/json")
            res.json(signupFormErrors)
        })

    })
    .catch(err => console.log(err))

}