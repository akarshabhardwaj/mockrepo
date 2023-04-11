const express = require('express');
const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")



const UserRouter=express.Router()

UserRouter.post("/signup",async (req,res)=>{
    try {
        const{email,password}=req.body
        const user=await UserModel.findOne({email})
        if(user)
        {
            res.status(400).send({"msg":"Please Login already Registered"})
        }
        else
        {
            bcrypt.hash(password, 5, function(err, hash) {
                if(err)
                {
                    res.status(400).send({"msg":"Please enter valid details"})
                }
                else
                {
                    const newUser=new UserModel({email,password:hash})
                    newUser.save()
                    res.status(200).send({"msg":"Successfully resgistered"})
                }
            }); 
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


UserRouter.post("/login",async (req,res)=>{
    try {
        const{email,password}=req.body
        const user = await UserModel.find({email})
        // console.log(user)
        if(user.length>0)
        {
            bcrypt.compare(password, user[0].password, function(err, result) {
               if(result)
               {
                let token = jwt.sign({ kanban: 'board' }, 'mock15');
                res.status(200).send({"msg":"login Successful", token})
               }
               else
               {
                res.status(400).send({"msg":"Please enter valid Password"})
               }
            });
        }
        else
        {
            res.status(400).send({"msg":"Please Enter valid Credentials"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
module.exports={UserRouter}