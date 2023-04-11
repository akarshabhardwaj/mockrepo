const express = require('express');
const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
const token=req.headers.authorization
jwt.verify(token, 'mock15', function(err, decoded) {
   if(decoded)
   {
    next()
   }
   else
   {
    res.send({"msg":err})
   }
  });
}

module.exports={authenticate}