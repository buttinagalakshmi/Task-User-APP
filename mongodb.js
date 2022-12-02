const {MongoClient, ObjectID} = require('mongodb')
const mongodb = require('mongodb')



const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = "task-manager"


MongoClient.connect(connectionURL,{ useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log("unable to conncet")
    }
    const db = client.db(databaseName)
    // Insertion One docuement
    // db.collection('users').insertOne({
    //     name: 'prithvi',
    //     age : 25
    // }, (error, result) =>{
    //     if(error){
    //        return  console.log("unable to insert collection")
    //     }
    //     console.log(result.ops)
    // })

    //Inserting many documents

    // db.collection('users').insertMany([
    //     {
    //         name: "nandini",
    //         age: 24
    //     },
    //     {
    //         name: 'joey',
    //         age: 50
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("unable to insert documents!")
    //     }else{
    //         console.log(result.insertedIds)
    //     }
    // })


    //inserting task collection

    // db.collection('task').insertMany([
    //     {
    //         description : 'studying',
    //         completed : false
    //     },
    //     {
    //         description : " course completed",
    //         completed: false
    //     },
    //     {
    //         description: "novel",
    //         completed: true
    //     }
    // ], (error, result) =>{
    //     if(error){
    //         return console.log("unable to insert into task collection!")
    //     }
    //     console.log(result.insertedIds)
    // })

    //findind record with ID

    // db.collection('users').findOne({_id: new ObjectID("6371c7d3ae010bccf7eb91cf")}, (error,user)=>{
    //     if(error){
    //         return console.log("unable to find document!")
    //     }
    //     console.log(user)
    // })


    //find all recordes not based on ID but with other fields
    // db.collection('users').find( {name:"prithvi"}).toArray((error,user)=>{
    //     if(error){
    //         return console.log("unable to fetch the documents!")
    //     }else{
    //         console.log(user)
    //     }
    // })
    // db.collection('users').find( {name:"prithvi"}).count((error,count)=>{
    //     if(error){
    //         return console.log("unable to fetch the documents!")
    //     }else{
    //         console.log(count)
    //     }
    // })


    //findind in task collection

    // db.collection('task').findOne( {_id: new ObjectID("6371d02698f7d6e0e86636b2")}, (error,tdata)=>{
    //     if(error){
    //         return console.log("unable to fetch task documents!")
    //     }
    //     console.log(tdata)
    // })

    // db.collection('task').find({completed : false}).toArray((error,tdata)=>{
    //     if(error){
    //         return console.log("untable to fetch DAta")
    //     }
    //     console.log(tdata)
    // })

    //update record on users records
    // db.collection('users').updateOne({
    //     _id: new ObjectID("6371ce82880b1c1a9b030c33")
    // },{
    //     $set:{
    //         name:"anushka sharma"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //updating muntiple records on users
    // db.collection('users').updateMany({
    //     age : 25
    // },{
    //     $set: {
    //         name: "prithvi raj singh"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    // update many on task
    db.collection('task').updateMany({
        completed: false
    },{
        $set:{
            completed: true
        }
    }).then((result)=>{
        console.log(result.modifiedCount)
    }).catch((error) =>{
        console.log(error)
    })

    // delete many on users collection
    // db.collection('users').deleteMany({
    //     age: 24
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //delete on on task collection
    // db.collection('task').deleteOne({
    //     _id: new ObjectID("6371d02698f7d6e0e86636b1")
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error) =>{
    //     console.log(error)
    // })

})