const User = require('../models/user')
const bcrypt = require("bcrypt")
const authenticateWithJWT = require('../authentication/authenticateWithJWT')
const config = require('../config')

module.exports = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .populate("favorite")
        .populate("reservations.reservationId")
        .then((user) => {
            if (user) {

                bcrypt.compare(req.body.password, user.password)
                    .then((same) => {
                        if (same) {

                            // create token and send to the client-side
                            const token = authenticateWithJWT.getToken({ _id: user._id })

                            // Add user._id to req.session to check for every request if the user is still login or no
                            req.session.userId = user._id

                            res.statusCode = 200
                            res.setHeader("content-type", "application/json")
                            res.header(config.HEADER_KEY, token)
                            res.json({ user: user, token: token })
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