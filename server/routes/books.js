
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', async(req, res, next) => {
  book.find((err, books)=>{
    if (err){
      return console.error(err);
    }else{
      res.render('books/add', { title: 'books', price:'', author:'', genre:'' });
    }
  });
 
});


// POST process the Book Details page and create a new Book - CREATE

router.post('/add', async(req, res, next) => {
  let newBook = new book({
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  }); 
  try{
    await newBook.save();
    res.redirect('/books')
  }catch (err){
    console.log(err)
    res.status(500).send(err);
  }

});

// GET the Book Details page in order to edit an existing Book

router.get('/edit/:id', (req, res, next) => {
  book.findById(req.params.id, (err, book) => {
    if (err) {
      console.error(err);
    } else {
      res.render('books/edit', { title: 'Edit Books', price:'', author:'', genre:'' });
    }
  });
 
});

// POST - process the information passed from the details form and update the document

router.post('/edit/:id', (req, res, next) => {
  let updatedBooks = {
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  };
   
  let id = req.params.id;

  book.findByIdAndUpdate( {_id: id}, updatedBooks, (err, book) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/books');
    }
  });
    
});

// GET - process the delete by user id

router.get('/delete/:id', async(req, res, next) => {

  let id = req.params.id;
  
  try{
    await book.findByIdAndRemove(id);
    res.redirect('/books')
}catch (err){
  console.log(err);
  res.status(500).send(err);
}
});


module.exports = router;
