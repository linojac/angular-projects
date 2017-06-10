/**
 * Created by Sundar on 12/8/16.
 */
var Book = require('../models/Book');
var HttpStatus = require('http-status');
var Validation = require('./Validation');
var exec = require('child_process').exec;
var fs = require('node-fs');

//Saves Book
exports.save = function(req, res) {
    console.log(req.body)
    var newBook = new Book();
    newBook.name = req.body.name;
    newBook.category = req.body.category;
    newBook.description = req.body.description;
    newBook.price = req.body.price;
    newBook.save(function(saveErr, saveBook) {
        if (saveErr) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: Validation.validatingErrors(saveErr)
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'success',
            code: HttpStatus.OK,
            data: saveBook,
            error: ''
        });
    });
};

exports.fetchById = function(req, res) {

    Book.findById(req.params.id, function(err, book) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });
            return;
        }
        if (book == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Book not found'
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'success',
            code: HttpStatus.OK,
            data: book,
            error: ''
        });
    });
};

exports.fetchAll = function(req, res) {
  console.log("Fetching Books");
    Book.find({}, function(err, books) {

        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'success',
            code: HttpStatus.OK,
            data: books,
            error: ''
        });

    })

};

exports.update = function(req, res) {


    Book.findById(req.params.id, function(err, book) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }
        if (book == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Book not found'
            });
            return;
        }
        book.name = req.body.name;
        book.category = req.body.category;
        book.description = req.body.description;
        book.price = req.body.price;
        book.save(function(saveErr, saveBook) {
            if (saveErr) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: 'failure',
                    code: HttpStatus.BAD_REQUEST,
                    data: '',
                    error: Validation.validatingErrors(saveErr)
                });
                return;
            }
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: saveBook,
                error: ''
            });
        });
    })
};

exports.remove = function(req, res) {


    Book.findByIdAndRemove(req.params.id, function(err, book) {

        if (err) {

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: '',
                error: 'unexpected error in accessing data'
            });

            return;
        }

        if (book == null) {
            res.status(HttpStatus.BAD_REQUEST).json({
                status: 'failure',
                code: HttpStatus.BAD_REQUEST,
                data: '',
                error: 'Book not found'
            });
            return;
        }
        res.status(HttpStatus.OK).json({
            status: 'success',
            code: HttpStatus.OK,
            data: 'Book Removed',
            error: ''
        });
    })
};

exports.saveBooks = function(req,res){
    var books = [{name:'A Winning Moto',category:'Inspirational Readings',description:'Great pictures make all the difference. That’s why there’s the new Moto G Plus, 4th Gen. It gives you a 16 MP camera with laser focus and a whole lot more, so you can say goodbye to blurry photos and missed shots. Instantly unlock your phone using your unique fingerprint as a passcode. Get up to 6 hours of power in just 15 minutes of charging, along with an all-day battery. And get the speed you need now and in the future with a powerful octa-core processor.',price:14999},
        {name:'A Bean Bags Story',category:'Fairy Tales',description:'This is a giant bean bag chair featuring a high back and deep base for ultimate comfort and support, even for tall adults. Made from quality faux leather to provide extra comfort to an already massive bean bag. Great for watching films, reading, relaxing or even having a little afternoon snooze!"',price:790},
        {name:'Harry Potter and the Cursed Child',category:'Fiction',description:'The Eighth Story. Nineteen Years Later.Based on an original new story by J.K. Rowling, John Tiffany and Jack Thorne, a new play by Jack Thorne.',price:569},
        {name:'Logitech Wireless Speaker',category:'Technology',description:'Rocking sound Crystal clear sound. Pump up the volume and enjoy! Connect and play Wirelessly connect, stream music, manage phone calls and control volume. Take it anywhere Perfect for life on the go. Take it on the road or relax and listen at home. Design In five bold colors, this unique design is sure to turn some heads 5 hour Battery Enjoy 5 hours of continuous play without recharging. Recharge the built-in lithium-ion battery with the convenience of the included micro-USB cable and rock on.',price:1558}];
    books.forEach(function(book){
        Book.findOne({name:book.name},function(err,detail){
            if(err) console.log(err);
            if(detail) console.log('Already Exist');
            if(!detail){
                var newBook = new Book();
                newBook.name = book.name;
                newBook.category = book.category;
                newBook.description = book.description;
                newBook.price = book.price;
                newBook.save(function(saveErr, saveBook) {
                    if (saveErr) {
                        console.log(saveErr);
                        return;
                    }
                    console.log('Saved')
                });
            }
        })
    })
};
