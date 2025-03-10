const mongoose = require('mongoose')

const userModel = new mongoose.Schema( {

    name: {
        type : String,
        required : true
    },
    
    email: {
        type: String,
        unique: true,
        required : true
    },
     
    password : {
        type: String,
        required: true,
    }, 

    age: {
        type: Number,
        min: 1
    }

}, {timestamps: true})

const user = new mongoose.model("newUsers", userModel)

module.exports = user


