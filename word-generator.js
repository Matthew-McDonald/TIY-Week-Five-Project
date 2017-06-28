"use strict";

const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

//
// function splitRandomWord(filteredWords) {
//   //Sets word length to <= 5
//   var filteredWords = words.filter(function(word) {
//       return word.length <= 5; });
//   var randomizeWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
//   //Randomizes Word
//   var randomWordArray = randomizeWord.split("");
//   //Splits word into a array of characters
//   return randomWordArray;
// }
//
// var arrayLength = randomWordArray.length;
// console.log(arrayLength);

// OPTION 2

// VARIABLE LIST
var filteredWords = words.filter(function(word) {
    return word.length <= 5; });
var randomizeWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
//Randomizes Word
var randomWordArray = randomizeWord.split('');
//Randomizes a word pulled from the dictionary file and splits it's characters into an array

var arrayLength = randomWordArray.length;

// SPLIT A RANDOM WORD INTO AN ARRAY
function splitRandomWord(filteredWords) {
  return randomWordArray;
}
console.log(randomWordArray);

//FIND THE LENGTH OF THE RANDOM ARAAY

console.log(arrayLength);


let guessArray = [];

for (var i = 0; i < randomizeWord.length; i++) {
  guessArray.push("_");

}

console.log(guessArray);



function compareGuess (req, res) {
  var correctedGuess = req.body.letter.toLowerCase();
  console.log(correctedGuess);
  var correct = false;

  for(i=0; i < randomizeWord.length; i++){ // this bit compares guesses to correct
    if (correctedGuess === randomizeWord[i]){
      correct = true;
      // req.session.letters[i].correct = true;
      guessArray = correctedGuess
        console.log(guessArray);
    }

  }
  return guessArray;
  // guessArray.push(correctedGuess);
  //   console.log(guessArray);
}

//Allows functions to be pulled from this file to app.js
module.exports = {
  find: splitRandomWord, compareGuess
}
