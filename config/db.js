const mongoose = require('mongoose');
require("dotenv").config();
mongoose.set("strictQuery", false);
const connection = mongoose.connect("mongodb+srv://akarshbhardwaj:akarshab@cluster0.ko7mssh.mongodb.net/airbnb")

module.exports = connection