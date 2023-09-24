const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const expressSession = require('express-session')

const Reservation = require('./models/reservation')

//Controllers
const storeUserController = require('./controllers/storeUser')
const userLoginController = require('./controllers/userLogin')
const getHotels = require('./controllers/getHotels')
const getAppartments = require('./controllers/getAppartments')
const getReservationDetails = require('./controllers/getReservationDetails')
const allReservations = require('./controllers/allReservations')
const getUser = require("./controllers/getUser.js")
const userLogout = require('./controllers/userLogout')
const addToFavorite = require('./controllers/addToFavorite')
const removeFromFavorite = require('./controllers/removeFromFavorite')
const addReview = require('./controllers/addReview')
const userReservation = require('./controllers/userReservation')
const cancelResrvation = require('./controllers/cancelReservation')

// connect to database
mongoose.connect('mongodb+srv://mohamed:mo7121998@cluster0.myzh7ct.mongodb.net/hotel-app')

const app = express();

//set up middlewares
app.use(cors({
    origin : "http://localhost:3001",
    credentials : true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({
    secret : "two mm"
}))

// listening to port
app.listen(3000 , () =>{
    console.log("App is listening to port 3000");
})

app.get('/' , (req , res , next) => {
    res.statusCode = 200
    res.setHeader('content-type' , 'application/json')
    res.json({"msg":'Hello'})
})


app.get('/hotels' , getHotels)
app.get('/appartments' , getAppartments)
app.get('/getreservationdetails/:id' , getReservationDetails)
app.get('/allreservations' , allReservations)
app.get('/getuser' , getUser)

app.post('/user/register' , storeUserController)
app.post('/user/login' , userLoginController)
app.post('/addtofavorite/:reservationId' , addToFavorite)
app.post('/removefromfavorite/:reservationId' , removeFromFavorite)
app.post('/logout' , userLogout)
app.post('/addreview/:reservationId' , addReview)
app.post('./userreservation/:reservationId' , userReservation)
app.post('./cancelresrvation/:reservationId' , cancelResrvation)

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