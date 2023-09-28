const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true , "Please Provide a firstname"]
    },
    lastName: {
        type: String,
        required: [true , "Please Provide a lastname"]
    },
    password:{
        type: String,
        required: [true , "Please provide a password"]
    },
    email: {
        type: String,
        required: [true , "Please provide an email"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true , "please provide your phone number"]
    },
    birthDate: {
        type: String,
        default : null
    },
    favorite : [{
        
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Reservation'
        
    }],
    reservations : [
        {
            reservationId:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Reservation'
            },
            from:{
                type: String,
            },
            to:{
                type: String
            }
        }
    ]
})

// uniqueValidator checks the duplicate entry for the database and provide a suitable error
userSchema.plugin(uniqueValidator)

// Hash the password of a registered user before save it
/*userSchema.pre('save' , function(next){
    const user = this

    console.log(user.password);
    
    bcrypt.hash(user.password , 10)
    .then((hashedPassword) =>{
        
        console.log(hashedPassword);

        user.password = hashedPassword
        next()
    })
    .catch((err) => console.log(err))
})*/

const User = mongoose.model('User' , userSchema)

module.exports = User;