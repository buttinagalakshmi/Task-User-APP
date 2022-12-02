const express = require('express')
const { update } = require('../models/task')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks',auth, async (req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//GET /tasks/sortBy=createdAt_desc
//GET /tasks/sortBy = createdAt_asc
//GET ALL tasks /tasks?limit=2&page=2 
//GET tasks based on skip and limit /tasks?limit=2&skip=2
//GET all tasks / localhost:3000/tasks?completed=true 

router.get('/tasks', auth, async (req,res)=>{

    const match ={}
    const sort={}
    if( req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]]= part[1] === 'desc'? -1:1
    }
    try{
        //const tasks = await Task.find()
        //const tasks = await Task.find({owner: req.user._id})
        // res.send(tasks)
        // await req.user.populate('tasks')
        await req.user.populate({
            path : 'tasks',
            match,
            options:{
                //no need parseInt()
                limit : parseInt(req.query.limit),
                //skip : parseInt(req.query.skip)
                skip : parseInt(req.query.limit) * (parseInt(req.query.page)-1),
                // sort:{
                //     //completed: -1
                //     description: 1
                // }
                sort
            }
        })
       res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{

    const _id = req.params.id
    try{
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task){
           return res.status(404).send()
        }
        res.send(task)

    }catch(e) {
        res.status(500).send()
    }
})


router.patch('/tasks/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid Update'})
    }
    try{

        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
       

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
       
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        return res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
            //const task = await Task.findByIdAndDelete(req.params.id)
            const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
          
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router