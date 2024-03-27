const mongoose=require('mongoose')

let dataSchema=new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    rePassword:String,
    date:String,
    userId:Number
    
})

let registerSchema=mongoose.model('newUser',dataSchema)

module.exports=registerSchema