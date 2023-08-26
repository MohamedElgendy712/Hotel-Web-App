const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Controllers
const storeUserController = require('./controllers/storeUser')
const userLoginController = require('./controllers/userLogin')

// connect to database
mongoose.connect('mongodb+srv://mohamed:mo7121998@cluster0.myzh7ct.mongodb.net/hotel-app')

const app = express();

//set up middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// listening to port
app.listen(3000 , () =>{
    console.log("App is listening to port 3000");
})

app.get('/' , (req , res , next) => {
    res.statusCode = 200
    res.setHeader('content-type' , 'application/json')
    res.json({"msg":'Hello'})
})

app.post('/user/register' , storeUserController)
app.post('/user/login' , userLoginController)