const User = require('../models/user')
const bcrypt = require("bcrypt")

module.exports = (req , res , next) => {
    User.findOne({email: req.body.email})
    .then((user) =>{
        if(user){
            bcrypt.compare(req.body.password , user.password)
            .then((same) =>{
                if(same){
                    res.statusCode = 200
                    res.setHeader("content-type","application/json")
                    res.json(user)
                }else{
                    res.statusCode = 500
                    res.setHeader("content-type","application/json")
                    res.json({"errorMsg" : "Invalid password"})
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        }else{
            res.statusCode = 404
            res.setHeader("content-type","application/json")
            res.json({"errorMsg" : "This email is not registered"})
        }
    })
    .catch((err) => {
        res.statusCode = 500
        res.setHeader("content-type","application/json")
        res.json({"errorMsg" : "Internal server error"})
    })
}