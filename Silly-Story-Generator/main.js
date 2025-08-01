/*
Name: Sheridyn Sharpe
File: main.js
Date: 25 July 2025
A JavaScript file for reference to index.html, the silly story generator.
*/

// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day."

const insertX = [
    "Willy the Goblin", 
    "Big Daddy", 
    "Father Christmas"
];

const insertY = [
    "the soup kitchen", 
    "Disneyland", 
    "the White House"
];    

const insertZ = [
    "spontaneously combusted", 
    "melted into a puddle on the sidewalk", 
    "turned into a slug and crawled away"
];    

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
    // Create a new random story each time the button is pressed.
    let newStory = storyText;

    // Get a random item out of each array.
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    // Replace values in the story string with random values from corresponding arrays.
    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replace(":inserty", yItem);
    newStory = newStory.replace(":insertz:", zItem);

  // Function, if a name was entered into customName, replace Bob with that name.  
  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  // Function, if UK radio button is selected, convert weight and temp values.
  if(document.getElementById("uk").checked) {
    const weight = `${Math.round(300 * 0.0714286)} stone`;
    const temperature =  `${Math.round((94 - 32) * 5/9)} centigrade`;

    // Replace corresponding temperature and weight to new values.
    newStory = newStory.replace("94 fahrenheit", temperature);
    newStory = newStory.replace("300 pounds", weight);
  }

  // Sets the text equal to the modified newStory variable.
  story.textContent = newStory;
  story.style.visibility = 'visible';
}