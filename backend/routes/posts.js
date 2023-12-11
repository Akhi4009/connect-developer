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

// @route PUT /posts/like:id

// @desc Like a Post

// @access Private

router.put("/like/:id",auth,async(req,res)=>{

    try{
        
        const post = await Post.findById(req.params.id);
       

 

        // Check if the post has already been liked
    
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
           return res.status(400).json({msg:"Post Already liked"});
        }

        post.likes.unshift({user:req.user.id})

        await post.save()

        res.json(post.likes)

    }catch(err){
        console.error(err.message)
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg:"Post not found"})
         }
        res.status(500).send("Server Error")

    }

   

})

// @route PUT /posts/unlike:id

// @desc Like a Post

// @access Private

router.put("/unlike/:id",auth,async(req,res)=>{

    try{
     
        const post = await Post.findById(req.params.id);
        

        

        // Check if the post has not liked
    
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
           return res.status(400).json({msg:"Post has not yet been liked"});
        }

       // remove like

       const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
       post.likes.splice(removeIndex,1)

        await post.save()

        res.json(post.likes)

    }catch(err){
        console.error(err.message)
        if(err.kind === "ObjectId"){
            return res.status(400).json({msg:"Post not found"})
         }
        res.status(500).send("Server Error")

    }

   

})


// @route POST /posts/comment/:id

// @desc Comment on a Post

// @access Private


router.post("/comment/:id",auth,async(req,res)=>{
   
    try {
        const user = await User.findById(req.user.id)
        const post = await Post.findById(req.params.id)
        const newComment=  {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:user.id
        }

        post.comments.unshift(newComment)

        await post.save()
        res.send(post.comments)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
    
    
})


// @route POST /posts/comment/:id/:comment_id

// @desc Delete Comment 

// @access Private


router.delete("/comment/:id/:comment_id",auth,async(req,res)=>{
  
    try {
        const post = await Post.findById(req.params.id)

        // Pull out comment

        // console.log(post)

        // console.log(req.params.comment_id)

        const comment=post.comments.find(comment=>comment.id===req.params.comment_id)

        // console.log(comment)

       // Make sure comment exists
       if(!comment){
        return res.status(404).json({msg:"Comment does not exists"})
       }

       // Check user
       if(comment.user.toString() !==req.user.id){
        return res.status(401).json({msg:"User not authorized"})
       }

      // remove comment

       const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
       post.comments.splice(removeIndex,1)

        await post.save()

        res.json(post.comments)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


module.exports=router
