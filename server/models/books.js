/*
File: users.js
Student's Name: Adinlewa Tawakalitu Eunice
Student ID: 301281523
Date: June 25, 2023
*/



let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
