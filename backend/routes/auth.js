const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../models/user")
const auth = require("../middleware/auth")


// @ruote  Get /auth

// @desc Test Rute

// @access Private

router.get("/", auth ,async(req,res)=>{
   
    try{
        const user = await User.findById(req.user.id)
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})


// @ruote  Post /auth

// @desc Authenticate User & get Token

// @access Private

router.post("/login",async(req,res)=>{

    const { email, password} = req.body
   
    try{
    // See if user exists 
    
    let user = await User.findOne({email}).select('+password')
   
    if(!user){
       return  res.status(400).json({errors:[{msg: 'Invalid Credential' }] })
    }

    const isMatch= await bcrypt.compare(password,user.password)
    

    if(!isMatch){
        return res.status(400).json({errors:[{msg: 'Invalid Credential' }] })
    }

   // Return jsonwebtoken

   const payload= {
    user:{
        id:user.id
    }
   };



 let token=  jwt.sign(payload,
    process.env.secretkey,
    {expiresIn:360000})
   
  res.json({
    msg:"Login sucessfully",
    token
  })

}catch(error){

    console.error(error.message)
    if(error.errors.status.kind==='required'){
        return res.status(400).json([{msg:error.errors.status.message}])
       }
    res.status(500).send('Server error')
}
})

module.exports=router