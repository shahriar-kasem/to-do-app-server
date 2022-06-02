const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { application } = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.ao8vh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();

        const toDoCollection = client.db('toDoList').collection('notes');

        // post
        app.post('/add', async(req,res) => {
            const add = req.body;
            const result = await toDoCollection.insertOne(add);
            res.send(result);
        })

        // get
        app.get('/notes', async(req,res) => {
            const query = {};
            const result = await toDoCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(result);
        })

        // delete
        app.delete('/note', async(req,res)=>{
            
        })
        console.log('Database connected')
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res)=> {
    res.send('TO DO APP Server is working fine')
})


app.listen(port, ()=> {
    console.log('To Do App Server is listening on port', port)
})