const express=require("express");
const auth=require("../middleware/auth")

const Post=require("../models/posts")
const User=require("../models/user")
const Profile=require("../models/profile")

const router=express.Router();

// @route POST /post

// @desc Create Post

// @access Private


router.post("/",auth,async(req,res)=>{
   
    try {
        const user = await User.findById(req.user.id)
        
        const newpost= new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:user.id
        })

        const post= await newpost.save()

        res.send(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
    
    
})

// @route Get /posts

// @desc Get all Post

// @access Private

router.get("/",auth,async(req,res)=>{

    try {
        const posts = await Post.find().sort({date:-1})
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})

// @route Get /posts/"id"

// @desc Get Post By id

// @access Private

router.get("/:id",auth,async(req,res)=>{

    try {
        const post = await Post.findById(req.params.id)

        if(!post){
           return  res.status(400).json({msg:"Post not found"})

        }
        res.json(post)
    } catch (err) {

        console.error(err.message)
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg:"Post not found"})
         }
        res.status(500).send("Server Error")
        
    }
})

// @route Delete /posts/"id"

// @desc Delete a post

// @access Private

router.delete("/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({msg:"Post not found"})
         }
        // Check user
        // console.log(post.user.toString())
        // console.log(req.user.id)
        if(post.user.toString() !== req.user.id){
            res.status(401).json({msg: 'user not authorized'})
        }

        await Post.findByIdAndDelete(req.params.id)
        res.json({"msg":"Post Deleted"})
    } catch (error) {

        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(400).json({msg:"Post not found"})
         }
         res.status(500).send("Server Error")

         
    }
})

module.exports=router
