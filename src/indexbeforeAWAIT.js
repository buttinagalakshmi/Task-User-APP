const express = require('express')
require('./db/mongoose')
const User = require('./models/User')

const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch( e) {
        res.status(400).send(e)
    }
     
    // console.log(user)
    // user.save().then(()=>{
    // res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
    // res.send("hello")
   
})

app.get('/users', async (req,res)=>{

    try{
        const users= await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }

    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
})


app.get('/user/:id', async (req,res)=>{


    try{
        const user = await User.findById(req.params.id)
        res.send(user)
    }catch(e){
        res.status(404).send()
    }
    // console.log(req.params.id)
    // User.findById(req.params.id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(404).send()
    // })
})


app.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }



    // const task = new Task(req.body)
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
} )



app.get('/tasks', async (req,res)=>{

    try{
        const tasks = await Task.find()
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
    // Task.find().then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.get('/task/:id', (req,res)=>{
    Task.findById(req.params.id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).then((e)=>{
        res.status(404).send()
    })
})

app.listen(port,()=>{
    console.log("server up on port no "+ port)
})