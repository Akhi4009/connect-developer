const express=require("express");
const request=require("request")
const router=express.Router();

const Profile=require("../models/profile")
const auth = require("../middleware/auth")
const User = require("../models/user")
const Post= require("../models/posts")
require("dotenv").config()

// Get profile/me
// Private

router.get("/me",auth,async(req,res)=>{
    
    try{
        // console.log(req.user.id)
         const profile=await Profile.findOne({user: req.user.id}).populate(
             'user',
            ['name','avatar']
       )
// console.log(profile)
        if(!profile){
            return res.status(400).json([{msg: 'There is no profile for this user'}]);
        }

        res.json(profile)


    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})

// post and update profile

// /profile

// private

router.post("/",auth,async(req,res)=>{

    // Get fields
    const {
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body

    // console.log(skills);
    // console.log(typeof (skills))
    const profileFields={};
    profileFields.user=req.user.id;
    if(handle) profileFields.handle=handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (skills && typeof (skills)==='string' ) {
      profileFields.skills = skills.split(',');
    }else{
        profileFields.skills = skills
    }

   

    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;



    try {

        let profile= await Profile.findOne({user: req.user.id})
        if(profile){
            //update
            profile= await Profile.findOneAndUpdate(
                { user:req.user.id },
                {$set: profileFields},
                {new: true}
                )
                return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)

        await profile.save()
        res.send(profile)
        
    } catch (error) {

       if(error.errors.status.kind==='required'){
        return res.status(400).json([{msg:error.errors.status.message}])
       }
        
        res.status(500).send('Server Error')
    }
})

// @desc Get all  profile

//@route Get /profile

// public

router.get("/",async(req,res)=>{

    try {

        const profiles = await Profile.find().populate('user',['name', 'avatar'])

        res.json(profiles)
    } catch (error) {
       console.error(error.message) 
       res.status(500).send('Server Error')
    }
})

// @desc Get profile by user ID

//@route Get /profile/user/:user_id

// public

router.get("/user/:user_id",async(req,res)=>{

    try {

        const profile = await Profile.find({
            user:req.params.user_id
        }).populate('user',['name', 'avatar'])

        //  console.log(profile)
        
        if(!profile || profile.length===0)
        return res.status(400).json({msg:"Profile is not found"})
    

        res.json(profile[0])
    } catch (error) {
        // console.log(error);
        if(error.kind=='ObjectId'){
           
            return res.status(400).json({msg:"Profile is not found"})

        }
       console.error(error.message) 
       res.status(500).send('Server Error')
    }
})


// @ROUTE DELETE /PROFILE

// @desc Delete profile, user & posts

// @access Private

router.delete("/",auth,async(req,res)=>{

    try {
       //  Remove user posts
       await Post.deleteMany({user:req.user.id})

       // Remove Profile
       await Profile.findOneAndDelete({user: req.user.id})

       // Delete User

       await User.findOneAndDelete({_id: req.user.id})
        
       res.json({msg:"User deleted"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   POST /profile/experience
// @desc    Add experience to profile
// @access  Private


router.put("/experience",auth,async(req,res)=>{

    const  {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      }= req.body;
      const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description}

    try {

       
        const profile= await Profile.findOne({user: req.user.id})
        // console.log(profile);

        
        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        // if(error.errors.status.kind==='required'){
        //     return res.status(400).json([{msg:error.errors.status.message}])
        //    }
        res.status(500).send("Server error")

    }
})


// @route   DELETE /profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private



router.delete("/experience/:exp_id",auth,async(req,res)=>{

    try {
        
        const profile= await Profile.findOne({user: req.user.id})
       
        // Get Remove index

        const removeIndex=profile.experience
        .map(ele=>ele.id)
        .indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex,1)

        await profile.save()

        res.json(profile)
        
     

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }

})



// @route   POST /profile/education
// @desc    Add education to profile
// @access  Private



router.put("/education",auth,async(req,res)=>{

    const  {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      }= req.body;
      const newEdu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {

       
        const profile= await Profile.findOne({user: req.user.id})
        // console.log(profile);

        
        profile.education.unshift(newEdu);

        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if(error.errors.status.kind==='required'){
            return res.status(400).json([{msg:error.errors.status.message}])
           }
        res.status(500).send("Server error")

    }
})


// @route   DELETE /profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private



router.delete("/education/:edu_id",auth,async(req,res)=>{

    try {
        
        const profile= await Profile.findOne({user: req.user.id})
       
        // Get Remove index

        const removeIndex=profile.education
        .map(ele=>ele.id)
        .indexOf(req.params.edu_id)

        profile.education.splice(removeIndex,1)

        await profile.save()

        res.json(profile)
        
     

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }

})



// @route   Get /profile/github/:username
// @desc    Get user repos from Github
// @access  Public



router.get("/github/:username",async(req,res)=>{

    // console.log(req.params.username)
    try {
        const options = {
            url:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubSecret}`,
            method: "GET",
            headers: {'user-agent': 'node.js'}

        }

        //  console.log(options.url)

        request(options,(error,responce,body)=>{
            if(error) console.error(error)
            // console.log(responce)
            if(responce.statusCode !==200){
                return res.status(404).json({msg:"No Github profile found"})
            }
           
             res.json(JSON.parse(body))
        })
       
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports=router