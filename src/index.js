const express = require('express')
require('./db/mongoose')
const User = require('./models/User')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
const Task = require('./models/task')
const { response } = require('express')


const app = express()
const port = process.env.PORT

// Middle ware express
// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send(" GET Requests are disabled")
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is temporarly unavaiable please try after sometime')
// })

//multer module
const multer = require('multer')
const upload =multer ({
    dest:'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, callback){
        // if(!file.originalname.endsWith('pdf')){
        //     return callback(new Error ('Please Upload PDF format'))
        // }
        //filtering file extention using regex expression
        if(!file.originalname.match(/\.(doc|docx)$/)) return callback(new Error ('Please Upload DOC or DOCX format files Only'))
       callback(undefined,true)
    }
})


app.post('/upload', upload.single('upload'),(req,res)=>{
    res.send()
}, (error, req,res,next)=>{
    res.status(404).send({error: error.message})
})


//Manually handling middleware with userdefined

// const errorMiddleware = (req,res,next)=>{
//     throw new Error('from my middle ware')
// }
// app.post('/upload', errorMiddleware,(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(404).send({error: error.message})
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



const bcrypt = require('bcryptjs')

const bcryptFunction = async()=>{
    const password = "nachi"
    const hashedPassword = await bcrypt.hash(password,2)
    const isMatched = await bcrypt.compare('nachi', hashedPassword)
    console.log(password)
    console.log(hashedPassword)
    console.log(isMatched)
}

app.listen(port,()=>{
    console.log("server up on port no "+ port)
})


// const jwt = require('jsonwebtoken')
// const myFun = async()=>{
//     const jt = jwt.sign({_id: 'abc'}, 'this', {expiresIn: '7 days'})
//     console.log(jt)
//     const jtMatch = jwt.verify(jt,'this')
//     console.log(jtMatch)
// }

// myFun()

// const myFun = async()=>{
    // const task = await Task.findById('637f232620d0e7021ede1bd5')
    // await task.populate('owner')
    // // console.log(task.owner)
    // console.log(task)

    // const user = await User.findById('637f231420d0e7021ede1bca')
    // await user.populate('tasks')
    // console.log(user.tasks)
// }


// myFun()