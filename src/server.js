const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const db = require('./db')

const port = 3000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);


app.listen(port, ()=>{
    console.log('Server listening on port', port)
})