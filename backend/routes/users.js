const express = require("express");
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

require('dotenv').config()

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("User route")
})

router.post("/register",async(req,res)=>{

    const { name, email, password} = req.body
    try{
    // See if user exists 
    
    let user = await User.findOne({email})
    

    if(user){
       return  res.status(400).json({errors:[{msg: 'User already exists' }] })
    }

    //Get users gravtar
    const avatar=gravatar.url(email,{
        s : '200',
        r : 'pg',
        d : 'mm'
    })

    // console.log(avatar)

        user = new User({
        name,
        email,
        avatar,
        password
    })

    //Encrypt password

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()


   // Return jsonwebtoken

   const payload= {
    user:{
        id:user.id
    }
   };

//    console.log(payload,process.env.secretkey);

 let token=  jwt.sign(payload,
    process.env.secretkey,
    {expiresIn:360000})
//    console.log(token)
  res.json({
    msg:"Resitered sucessfully",
    token
  })

}catch(error){

    console.error(error.message)
    if(error.errors.status.kind==='required'){
        return res.status(400).json([{msg:error.errors.status.message}])
       }
    res.status(500).send({errors:[{msg:'Server Error'}]})
}
})

module.exports=router