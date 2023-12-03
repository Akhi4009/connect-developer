const mongoose=require("mongoose")
const validator=require("validator")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    avatar:{type:String},
    date:{type:Date,default:Date.now}
})

const User=mongoose.model("user",userSchema)

module.exports=User