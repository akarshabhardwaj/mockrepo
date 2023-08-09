const express = require('express');
const { GetProperty, AddProperty, UserProperty, DeleteUserProperty } = require('../controllers/property.controller');

const Propertyroute = express.Router();

Propertyroute.get("/all", GetProperty)
Propertyroute.post("/add", AddProperty)
Propertyroute.get("/userproperty", UserProperty)
Propertyroute.delete("/delete/:id", DeleteUserProperty)

module.exports = Propertyroute