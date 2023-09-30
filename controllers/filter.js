const Reservation = require("../models/reservation")

module.exports = (req , res , next) => {

    const {fromPrice = "0" , toPrice = "9,999" , type , rate = "0"} = req.body


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