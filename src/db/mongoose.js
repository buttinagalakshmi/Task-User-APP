const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true, 

    useUnifiedTopology: true 
})

// const me = new User({name:"prithvi",password: "pAssword12321", email: "nachi@gmail.com"})
// me.save().then(() =>console.log(me)).catch((error)=>console.log("Error!", error))


// const taskOne = new Task({description: "             eat"})
// taskOne.save().then(()=> console.log(taskOne)).catch((error)=> console.log("Error!",error))