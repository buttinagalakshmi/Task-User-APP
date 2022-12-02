const express = require('express')
const { update } = require('../models/task')
const User = require('../models/User')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail} = require('../emails/account')
const {cancelingEmail}= require('../emails/account')
const router = new express.Router()


router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user})
    }catch( e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400)
    }
})

router.post('/users/logout',auth, async (req,res)=>{

    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})
router.post('/users/logoutALL',auth, async(req,res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth, async (req,res)=>{
    res.send(req.user)
})

router.get('/user/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me',auth, async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates =  ['name','email','password','age']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({error: 'Invalid Update'})
    }
    try{
        //const user = await User.findById(req.user._id)
        updates.forEach((update)=> req.user[update]= req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true})
        res.send(req.user)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async(req,res)=>{
    try{
    //  const user = await User.findByIdAndDelete(req.user._id)
    await req.user.remove()
    cancelingEmail(req.user.email, req.user.name)
     res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})


//user profile upload 
const upload = multer({
    // dest: 'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file,callback){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return callback(new Error("The Image format should be jpg, png or jpeg"))
        }
        callback(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{
    console.log(req.file.buffer)
    const buffers = await sharp(req.file.buffer).resize({ width:20, height: 20}).png().toBuffer()
    //req.user.avatar = req.file.buffer

    req.user.avatar = buffers
    await req.user.save()
    res.send()
}, (error,req,res,next)=>{
    res.status(400).send({error: error.message})
})


router.delete('/users/me/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


router.get('/users/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
         throw new Error()
        }
        // res.set('Content-Type','image/jpg')
        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }

})



module.exports = router