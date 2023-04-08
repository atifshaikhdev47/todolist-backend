const mongoose = require("mongoose")

const userModel=mongoose.model("users",{
name:{type :String},
email:{type:String},
mobile:{type:Number}
})

module.exports= userModel