const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')

exports.getToken = (userId) => jwt.sign(userId , config.TOKEN_SECERT , {expiresIn : 600})

exports.verifyUser = (req , res , next) => {
    
    const token = req.header(config.HEADER_KEY)

    let verfied = null

    try {
        
        verfied = jwt.verify(token , config.TOKEN_SECERT)
        
    } catch (error) {
        res.status(400).send("Expired token")
        return;
    }
    
    User.findById(verfied._id)
    .then(user => {

        if (user) {
            next()
        }else{
            res.statusCode = 401
            res.setHeader("content-type" , "application/json")
            res.json({msg: "Unauthorized"})
        }
    })
    .catch(err => console.log("err"))
}