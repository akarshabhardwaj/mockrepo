const express = require('express');
require("dotenv").config()
const{connection}=require("./configs/db");
const { UserRouter } = require('./routes/user.route');
const { authenticate } = require('./middleware/authenticate');
const cors = require('cors');

const app=express()
app.use(cors())
app.use(express.json())

app.use("/",UserRouter)
app.use(authenticate)




app.listen(process.env.port,async (req,res)=>{
    try {
        await connection
        console.log("Connected to Database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Listening at 8080")
})