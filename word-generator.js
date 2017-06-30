"use strict";

const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const guesses = [];
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
  guessArray.push("_")
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
console.log(guessArray);
console.log(guesses);

//Allows functions to be pulled from this file to app.js
module.exports = {
  find: compareGuess
}
