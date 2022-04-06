// A list of questions and their answers. Only one answer per question is correct.
const quizData = [{
    question: "Who played Marcus Aurelius?",
    a: "James Franco",
    b: "Joaquin Phoenix",
    c: "Richard Harris",
    correct: "c",
  },
  {
    question: "Finish this quote: 'At my signal, ______ hell.' ",
    a: "release",
    b: "unleash",
    c: "enter",
    correct: "b",
  },
  {
    question: "What 3-word phrase did soldiers say to each other as a sign of respect?",
    a: "Strength and Honor",
    b: "Justice and Alliance",
    c: "Might and will",
    correct: "a",
  },
  {
    question: "Why did Hagen try a bit of Maximus food?",
    a: "He was hungry",
    b: "He was greedy",
    c: "To see if it was poisoned",
    correct: "c",
  },
  {
    question: "What was Maximus known as to the mob before everyone found out his name?",
    a: "Spaniard",
    b: "Maximus",
    c: "Illidan",
    correct: "a",
  },
];

const maxTopScores = 5;
const STORAGE_KEY = 'gladiator-quiz';

// Creates variables for the various html elements
const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const answerLabelElements = document.querySelectorAll('.answer-label');
const questionElement = document.getElementById('question');
const submit = document.getElementById('submit');
const playgame = document.getElementById('playgame');
const stats = document.getElementById('stats');
const quizSection = document.getElementById("quiz-header")

const playerNameFormContainer = document.getElementById("player-name-form-container");
const form = document.getElementById('player-name-form');

let currentQuestion = 0;
let score = 0;
let intervalId = null;
let scores = [];
let elapsedTimeMS = 0;

/**
 * Shows the answers when game starts
 */
function showAnswers(show) {
  answerElements.forEach((el) => {
    el.style.visibility = show ? 'visible' : 'hidden';
  });

  answerLabelElements.forEach((el) => {
    el.style.visibility = show ? 'visible' : 'hidden';
  });
}
/**
 * 
 */
function addEventHandlers() {
  playgame.addEventListener('click', () => {
    playgame.classList.add("hide");
    submit.classList.remove("hide")
    showElements();
    setTimer();
    loadQuestion();
  });

  // Defines the logic for the submit button (on-click)
  submit.addEventListener('click', submitLogic);
  form.addEventListener('submit', formLogic);
}

/**
 * The form for the final scores
 */
function formLogic(event) {
  event.preventDefault();
  const playerName = event.target.elements['player-name'].value;
  const value = localStorage.getItem(STORAGE_KEY);
  if (value) {
    scores = JSON.parse(value);
  } else {
    scores = [];
  }
// Calculates the final score
  const finalScore = (score * 1000) - elapsedTimeMS;

  scores.push({
    playerName: playerName,
    score: finalScore < 0 ? 0 : finalScore,
  });

  // sort scores by score
  scores.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else if (a.score > b.score) {
      return -1;
    }
    return 0;
  });

  // Pop removes the last player from the list of top players if there is an overflow
  if (scores.length > maxTopScores) {
    scores.pop();
  }

  // Converts the scores into a string and updates it in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  hidePlayerNameForm();
  renderScores();
}

/**
 * Sets up the logic for the submit functions
 */
function submitLogic() {
  // Gets the id number for the selected radio button
  const answer = getSelected();

  if (answer) {
    // Compares the user's selected answer to the correct answer
    if (answer === quizData[currentQuestion].correct) {
      // Adds one point to the score
      score++;
    }
    // Advances the question selector
    currentQuestion++;

    // Checks if the end of the quiz has been reached, otherwise
    // show feedback to the player
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      // Stops the timer
      clearInterval(intervalId);
      currentQuestion = 0
      showPlayerNameForm();
    }
  }
}

/**
 * Shows the player name form when the game ends
 */
function showPlayerNameForm() {
  quiz.classList.add("hide")
  playerNameFormContainer.classList.remove('hide');
}

/**
 * Hides the play name form when the game starts
 */
function hidePlayerNameForm() {
  quiz.classList.remove("hide")
  playerNameFormContainer.classList.add('hide');
}

/**
 * Shows the player-form, final scoreboard and the button to play again
 */
function renderScores() {

  const container = document.createElement("div")
  container.id = "scores-container"
  document.createElement("h2");
  let x = document.createElement("h2");
  x.textContent = 'High score'
  let table = document.createElement("table");
  let header = table.createTHead();
  let headers = header.insertRow(0);
  headers.innerHTML = `<th class="position">Position</th>
                        <th class="player-name">Player Name</th>
                        <th class="score">Score</th>`;


  let tblBody = document.createElement('tbody');
  tblBody.id = "tbody"

  scores.forEach((item, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td class="position">${index + 1}</td> 
                        <td class="player-name">${item.playerName}</td>
                        <td class="score">${item.score}</td>`;
    if (item.currentPlayer) {
      tr.classList.add('last-game');
    }
    tblBody.appendChild(tr);
  });
  table.appendChild(tblBody);
  container.appendChild(table)
  quiz.appendChild(container)


  submit.innerHTML = 'Play Again'
  submit.addEventListener('click', resetGame)
  quizSection.classList.add("hide")
}

/**
 * Shows the questions functions in the quiz-box
 */
function showElements() {
  submit.style.visibility = 'visible';
  questionElement.style.visibility = 'visible';
  answerElements.forEach(answerEl => {
    answerEl.style.visibility = 'visible';
  });
  showAnswers(true);
}

/**
 * Sets up a new question for the quiz
 */
function loadQuestion() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuestion];

  // Sets up the current question and answers
  questionElement.innerText = currentQuizData.question;

  const answers = [currentQuizData.a, currentQuizData.b, currentQuizData.c];
  answerLabelElements.forEach((el, index) => {
    el.innerText = answers[index];
  });

  stats.classList.remove('hide');
  stats.innerText = `Question ${currentQuestion +1}/${quizData.length} \nCorrect Answers: ${score}`;
}

/**
 * Deselects all the radio buttons
 */
function deselectAnswers() {
  answerElements.forEach(answerEl => answerEl.checked = false)
}

/**
 * Gets the id of the selected radio button
 */
function getSelected() {
  let answer;
  // Loops through every radio button to find the selected one
  answerElements.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  // Returns the id number for the selected radio button
  return answer;
}

/**
 * Sets the timer to count down when the game starts
 */
function setTimer() {
  intervalId = setInterval(() => {
    elapsedTimeMS++;
  }, 1000);
}

/**
 * Restarts the quiz game 
 */
function resetGame() {
  submit.removeEventListener("click", resetGame)
  document.getElementById("scores-container").remove()
  playgame.classList.remove("hide");
  startGame();
}

/**
 * Starts the quiz-game
 */
function startGame() {
  currentQuestion = 0;
  score = 0;
  intervalId = null;
  scores = []
  quizSection.classList.remove("hide")
  submit.style.visibility = 'hidden';
  showAnswers(false);
  questionElement.innerText = 'Welcome to the Gladiator Quizgame\nHere you will answer 5 questions about the Gladiator movie';
  submit.innerHTML = 'Submit';
  stats.classList.add('hide');
  addEventHandlers();
}

document.addEventListener("DOMContentLoaded", startGame);