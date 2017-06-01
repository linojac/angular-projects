/**
 * Created by Lino on 12/8/16.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

var BookSchema = new mongoose.Schema({

    name:{type:String,required:true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
});

mongoose.connection.on('error', function(err) {
  console.error('MongoDB error: %s', err);
});

var Book = mongoose.model('Book', BookSchema);
module.exports = Book;

BookSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
