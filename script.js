"use strict";
/* 

HUR? 
användaren ska få ett startord och slutord
det ska enbart gå att kunna ändra en bokstav i taget
Varje ord ska också kontrolleras mot detta API för att se så det är ett korrekt engelskt ord annars ska det ordet inte godtas.

*/

const wordList = [
  {
    startWord: "FOUR",
    endWord: "FIVE",
    text: "Raise FOUR to FIVE",
  },
  {
    startWord: "EYE",
    endWord: "LID",
    text: "Cover EYE with LID",
  },
  {
    startWord: "TIGER",
    endWord: "ROSES",
    text: "Crown TIGER with ROSES",
  },
  {
    startWord: "WHEAT",
    endWord: "BREAD",
    text: "Make WHEAT into BREAD",
  },
];

const inputElement = document.querySelector(".section-input");
const textHint = document.querySelector(".details__text-hint");
const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let startingWord;

function getRandomWord() {
  const randomWord = wordList[Math.trunc(Math.random() * wordList.length)];
  startingWord = randomWord.startWord;

  // Making each letter an input field
  let html = "";
  for (let i = 0; i < startingWord.length; i++) {
    html += `<input type="text" maxlength="1" autofocus value="${startingWord[i]}" />`;
  }
  inputElement.innerHTML = html;
  textHint.innerHTML = randomWord.text;
}
getRandomWord();

function guess() {
  inputElement.addEventListener("keyup", function (event) {
    let keyPressed = event.key;
    if (keyPressed.match(/[a-z]/i)) {
      let guessedLetter = "";
      for (const letter of document.querySelectorAll("input")) {
        guessedLetter += letter.value.toUpperCase();
        startingWord = guessedLetter;
        console.log(letter);
      }
      getUserWord(startingWord);
    }
  });
}
guess();

async function getUserWord(startingWord) {
  try {
    const response = await fetch(`${BASE_URL}${startingWord}`);
    const data = await response.json();
    console.log("sökord -->", data);
    return data;
  } catch (error) {
    console.log("error ⛔️");
  }
}

// getUserWord("No");
