//cd into client, npm start to start client
//cd into confirmationapp and nodemon server to start server

const express = require('express');
const connectDb = require('./config/db');
const authRoute = require('./routes/authRoute');
require('dotenv').config();
const app = express();
const port = 5000;

connectDb();
app.use(express.json());
app.use('/auth', authRoute);
app.listen(port, ()=> {
    console.log(`Server started on port: ${port}`)
})

