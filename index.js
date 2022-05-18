const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
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