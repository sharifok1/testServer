const express = require('express');

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
require('dotenv').config()
const app =express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 7000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he93e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("test-service");
        const testServiceCollection = database.collection("services-data");
        // create a document to insert  
        //GET API -----------------------------get
        app.get('/serv', async (req, res)=>{
            const cursor =  testServiceCollection.find({});
            const services = await cursor.toArray();
            res.send(services)
        })
      } 
        finally {
         //   await client.close();//can ignor
      }
  }
    run().catch(console.dir);





app.get ('/', (req,res)=>{
    res.send('tara hola tara hora');
})

app.listen(port,()=>{
    console.log("lisition from port", port)
})