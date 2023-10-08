const Reservation = require("../models/reservation")

module.exports = (req , res , next) => {

    const fromPrice = req.body.fromPrice || "0"
    const toPrice = req.body.toPrice || "9,999"
    const type = req.body.type || undefined
    const rate = req.body.rate || "0"

    Reservation.find({
        $and: [{price: {$gte: fromPrice}} , {price: {$lte: toPrice}}],
        rating: {$gte: rate}
    })
    .then((data) => {

        console.log(data.length);

        if (type !== undefined) {
            
            data = data.filter((reservation => reservation.type === type))

        }
        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json(data)
    })
    .catch((err) => console.log(err))

}