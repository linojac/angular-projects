const express = require('express');
const router = express.Router();


var BookController = require('./controllers/BookController');
BookController.saveBooks();


//Product routes
router.post('/book', BookController.save);
router.get('/book/:id', BookController.fetchById);
router.get('/books', BookController.fetchAll);
router.put('/book/:id', BookController.update);
router.delete('/book/:id', BookController.remove);

module.exports = router;
