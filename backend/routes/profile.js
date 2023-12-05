const express=require("express");

const router=express.Router();

const Profile=require("../models/profile")
const auth = require("../middleware/auth")
const User = require("../models/user")

// Get profile/me
// Private

router.get("/me",auth,async(req,res)=>{
    
    try{
        // console.log(req.user.id)
         const profile=await Profile.findOne({user: req.user.id}).populate(
             'user',
            ['name','avatar']
       )
console.log(profile)
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
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
    if (skills ) {
      profileFields.skills = skills.split(',');
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
        console.error(error.message);
        res.status(500).send('Server error')
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

        const profiles = await Profile.find({
            user:req.params.user_id
        }).populate('user',['name', 'avatar'])

        if(!profiles)
        return res.status(400).json({msg:"Profile is not found"})

        res.json(profiles)
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
       // @todo remove user and posts

       // Delete Profile
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
        res.status(500).send("Server error")

    }
})

// @route   DELETE /profile/experience/:edu_id
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

module.exports=router