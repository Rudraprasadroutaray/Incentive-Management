const mongoose=require('mongoose')

let dataSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    rePassword:String,
})

let registerSchema=mongoose.model('newAdmin',dataSchema)

module.exports=registerSchema