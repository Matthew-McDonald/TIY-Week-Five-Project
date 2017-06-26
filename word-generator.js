const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


function splitRandomWord(words) {
  var randomizeWord = words[Math.floor(Math.random() * words.length)];
  var randomWordArray = randomizeWord.split("");
  return randomWordArray;
}




//Allows functions to be pulled from this file to app.js
module.exports = {
  find: splitRandomWord
}
