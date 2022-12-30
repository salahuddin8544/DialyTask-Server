const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { query } = require('express');
const port = process.env.PORT || 5000 ;

// middle ware 
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.COMPUTER}:${process.env.PASSWORD}@cluster0.mdunt9i.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const taskCollections = client.db('assignment12').collection('task')
        app.post('/addtask', async(req,res)=>{
            const task = req.body;
            console.log(task);
            const result = await taskCollections.insertOne(task)
            res.send(result)
        })
        app.get('/addtask', async (req,res)=>{
            const query = {}
            const result = await taskCollections.find(query).toArray()
            res.send(result)
        })

         app.delete('/addtask/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const myTask = await taskCollections.deleteOne(query)
            res.send(myTask)
        })

        app.get('/addtask/:id', async (req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await taskCollections.find(query).toArray()
            res.send(result)
        })



        

    }
    finally{

    }
}
run().catch(err=> console.log(err))



// listener use for see server running in console 
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, ()=> {
    console.log(`computer reseller server running on ${port}`)
})