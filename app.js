const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const Reservation = require('./models/reservation')

//Controllers
const storeUserController = require('./controllers/storeUser')
const userLoginController = require('./controllers/userLogin')
const getHotels = require('./controllers/getHotels')
const getAppartments = require('./controllers/getAppartments')

// connect to database
mongoose.connect('mongodb+srv://mohamed:mo7121998@cluster0.myzh7ct.mongodb.net/hotel-app')

const app = express();

//set up middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// listening to port
app.listen(3000 , () =>{
    console.log("App is listening to port 3000");
})

app.get('/' , (req , res , next) => {
    console.log(req.query);
    res.statusCode = 200
    res.setHeader('content-type' , 'application/json')
    res.json({"msg":'Hello'})
})

app.get('/gethotels' , getHotels)
app.get('/getappartments' , getAppartments)

app.post('/user/register' , storeUserController)
app.post('/user/login' , userLoginController)

// API for add data
app.post('/reservation' , (req , res , next) =>{
    console.log(req.body);
    Reservation.create(req.body)
    .then((reservation) =>{
        res.statusCode = 200
        res.setHeader("content-type", "application/json")
        res.json(reservation)
    })
    .catch((err) => console.log(err))
})