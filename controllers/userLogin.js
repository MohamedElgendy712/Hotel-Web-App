const User = require('../models/user')
const bcrypt = require("bcrypt")

module.exports = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((same) => {
                        if (same) {
                            // Add user._id to req.session to check for every request if the user is still login or no
                            req.session.userId = user._id
                            res.statusCode = 200
                            res.setHeader("content-type", "application/json")
                            res.json(user)
                        } else {
                            res.statusCode = 500
                            res.setHeader("content-type", "application/json")
                            res.json({ "errorMsg": "Invalid password" })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                res.statusCode = 404
                res.setHeader("content-type", "application/json")
                res.json({ "errorMsg": "This email is not registered" })
            }
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500
            res.setHeader("content-type", "application/json")
            res.json({ "errorMsg": "Internal server error" })
        })
}