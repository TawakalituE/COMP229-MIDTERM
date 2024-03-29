/*
File: users.js
Student's Name: Adinlewa Tawakalitu Eunice
Student ID: 301281523
Date: June 25, 2023
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {

      res.render('content/index', {
        title: 'Home',
        books: 'books' 
      });
    
  });


module.exports = router;