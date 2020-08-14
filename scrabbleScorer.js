    // Refer to the online book to access detailed instructions for this project.
// URL = https://education.launchcode.org/intro-to-professional-web-dev/assignments/scrabble-scorer.html
const input = require('readline-sync')
// Code your transform function here:
function transform (object) {
  let newObject = {};
  for (item in object){
    for (let i=0; i<object[item].length; i++){
      newObject[object[item][i]]= item
    } 
  }
  return newObject;
}




// Code your initialPrompt function here:
function intialPrompt() {
  console.log(`Welcome to the Scrabble score calculator!\nWhich scoring algorithm would you like to use?

0 - Scrabble: The traditional scoring algorithm.
1 - Simple Score: Each letter is worth 1 point.
2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt`);

  let system = Number(input.question("Enter 0, 1, or 2: "));
  return system;
  
}

// Code your runProgram function here:


// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

let newPointStructure = transform (oldPointStructure);


function simpleScorer (word){
  return word.length
}

function bonusVowels (word){
  let vowels = ["a", "e", "i", "o", "u"];
  let lower = word.toLowerCase();
  let total = 0;
  for (let i=0; i<lower.length; i++){
    if(vowels.includes(lower[i])===true){
      total +=3;
    } else {
      total +=1
    }
  }
  return total
  }


function scrabbleScorer (word, structure=newPointStructure){
  let total = 0;
  let casedWord = word.toUpperCase()
  for (let i=0; i<casedWord.length;i++){
    for (item in newPointStructure){
      if (item.includes(casedWord[i])===true){
        total += Number(newPointStructure[item])
      }
  }
  
}
return total
}

const scrabble = {
  name : "Scrabble",
  description : "The traditional scoring algorithm.",
  scoreFunction : function (string){return scrabbleScorer(string)}
};

const simple = {
  name : "Simple Scorer",
  description : "Each letter is worth 1 point.",
  scoreFunction : function (string){return simpleScorer(string)}
};

const bonus = {
  name : "Bonus Vowels",
  description : "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction : function (string){return bonusVowels(string)}
};

let scoringAlgorithms = [scrabble, simple, bonus];


// Call the runProgram function here:

function RunProgram (algorithms){
  let x = intialPrompt()
 
  let wordToScore= ""
  while (wordToScore !== "stop"){
    wordToScore= input.question("Enter a word to score or type stop to end: ");
    console.log(`Score for ${wordToScore}: ${algorithms[x].scoreFunction(wordToScore)}`);
    
  }
  
}

RunProgram(scoringAlgorithms)