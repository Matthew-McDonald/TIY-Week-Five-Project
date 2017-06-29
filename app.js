//********REQUIREMENTS**********
const fs = require("fs");
const session = require("express-session");
const express = require("express");
const expressValidator = require("express-validator");
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// const serve = require('express-static')
// const wordGenerator = require('./word-generator');



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

//Tells app to utilize express-validator ************
app.use(expressValidator());

app.use(express.static('public'));
//Setting up the session data ***************************************
app.use(session({
  secret: 'butter churner',
  resave: false,
  saveUninitialized: true
}));

//BEGIN VARIABLES *****************************************
// searchBar.focus();


const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const arr = [];
const guesses = [];
const solvedmessage = "YOU WIN!"
let guess;
let guessArray = [];
let alreadyGuess = false;

var guessesLeft = 8;
var correct = false;

var filteredWords = words.filter(function(word) {
  return word.length > 4 && word.length < 6; });
var randomizeWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
var randomWordArray = randomizeWord.split('');
var arrayLength = randomWordArray.length;

console.log(randomWordArray);

//MAKE GUESSARRAY FILL WITH _ FOR THE LENGTH OF THE RANDOM WORD

for (var i = 0; i < randomizeWord.length; i++) {

  guessArray.push("_");

}

//COMPARES GUESS TO EACH LETTER IN THE randomWordArray AND IF CORRECT REPLACES IT IN THE EMPTY ARRAY
function compareGuess (req, res) {

  for(i=0; i < randomizeWord.length; i++){
    if (guess === randomizeWord[i]){
      guessArray[i] = guess
      console.log(guessArray);
    }
  }
  for (let i = 0; i < guesses.length; i++) {
    if (guess === guesses[i]) {
      alreadyGuess = true;
    }
  }

  if (alreadyGuess === false && randomizeWord.indexOf(guess) === -1){
    guesses.push(guess);
    guessesLeft--;
  }

  return guessArray;
}

function checkWin(guessesLeft) {
  if (guessesLeft === 0) {
    res.redirect('lose');

  }
}

console.log(guessArray);
console.log(guesses);

//BEGIN GETS AND POSTS*****************************************

app.get('/', function(req, res){

    res.render('index', {
    randomWordArray: randomWordArray,
    guessArray: guessArray,
    guesses: guesses,
    guessesLeft: guessesLeft})
});

app.post('/', function(req, res) {
    //SETS THE VALUE OF THE TEXT FIELD TO GUESS FOR COMPARE GUESS FUNCTION ABOVE
    var correctedGuess = req.body.letter.toLowerCase();
    guess = correctedGuess


    compareGuess(guess);

    if (guessesLeft === 0) {
      res.redirect('lose');
      }

    let finalWord = randomWordArray.join(",");
    let finalGuessWord = guessArray.join(",");
      if (finalWord === finalGuessWord) {
        res.redirect('win');}

    res.render('index', {
      randomWordArray: randomWordArray,
      guessArray: guessArray,
      guesses: guesses,
      guessesLeft: guessesLeft})

    console.log(guesses)

})

app.get('/lose', function(req, res) {
  res.render("lose");
})

app.get('/win', function(req, res) {
  res.render("win");
})

//listens for the app and the port 3000
app.listen(2000, function () {
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
