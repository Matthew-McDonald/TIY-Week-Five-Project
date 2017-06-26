//********REQUIREMENTS**********
const fs = require("fs");
const session = require("express-session");
const express = require("express");
const expressValidator = require("express-validator");
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const wordGenerator = require('./word-generator');


const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const app = express();

//Connecting mustache-express to the app engine and linking it to the views folder
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

//Tells app to use the body-parser module for json files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects

//Tells app to utilize express-validator
app.use(expressValidator());

//Setting up the session data
app.use(session({
  secret: 'butter churner',
  resave: false,
  saveUninitialized: true
}));



app.get('/', function(req, res){

  var randomWord = wordGenerator.find(words)
  res.send(randomWord);
  console.log(randomWord);
})






//listens for the app and the port 3000
app.listen(3000, function () {
  console.log('Successfully started express application!');
});


// 1. write a function that randomly selects a word from the database everytime a new 'session' is started
//2. Use a form to accept 'letter' submissions
//3. Use expressValidator to make sure no more than 1 letter is entered
//4. function that parses through the selected random word a letter at a time and checks to see if the inputed letter matches a letter in the word
//5. create a function that tracks the number of guesses submitted, if more than 8, the user loses and a display is prompted that they lose
//6. if the guess is wrong, store the guess in an array(or text area) and remove one guess from the total allowed
//7. create a function that displays the number of guesses and removes one each time a user submits a letter
//8. create a express validator that checks if a letter has already been guessed, if so, a guess is not removed
