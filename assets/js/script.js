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

const playerNameFormContainer = document.getElementById("player-name-form-container");
const form = document.getElementById('player-name-form');

let currentQuestion = 0;
let score = 0;
let intervalId = null;
let scores = [];

/**
 * 
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
        playgame.style.visibility = 'hidden';
        showElements();
        setTimer();
        loadQuestion();
    });

    // Defines the logic for the submit button (on-click)
    submit.addEventListener('click', () => {
        submitLogic();
    });

    form.addEventListener('submit', (event) => {
        formLogic();
    });
}

function formLogic(){
    event.preventDefault();
        const playerName = event.target.elements['player-name'].value;
        const value = localStorage.getItem(STORAGE_KEY);
        if (value) {
            scores = JSON.parse(value);
        } else {
            scores = [];
        }

        scores.push({
            playerName: playerName,
            score: score
        });

        // sort scores by score
        scores.sort((a, b) => {
            if (a.score < b.score) {
                return -1;
            }
            else if (a.score > b.score) {
                return 1;
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

function submitLogic(){
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

                showPlayerNameForm();

                // intervalID keeps track of the time in seconds
                // quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions</h2>
                // <h2>You scored ${currentScore} points</h2>
                // <button onclick="location.reload()">Start again</button>
                // `;
                //renderScores();
            }
        }
}

function showPlayerNameForm() {
    playerNameFormContainer.classList.remove('hide');
}

function hidePlayerNameForm() {
    playerNameFormContainer.classList.add('hide');
}

function renderScores() {
   
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
    quiz.firstElementChild.remove();
    quiz.appendChild(x);
    quiz.appendChild(table);

    //Remove event listener
    submit.removeEventListener()
    //Get back new event listener for Play Again
     submit.innerHTML = 'Play Again'
     submit.addEventListener('click', () => {
         //Attempt a restart to the quiz
         //Alla korrekta knappar etc ska visas. 
         //Kanske spara firstElementChild i en variabel, så att vi kan visa det igen
         //efter att play again har tryckts på?
     })
}

/**
 * 
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

    stats.innerText = currentQuestion + "/" + quizData.length;
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

function setTimer() {
    intervalId = setInterval(() => {
        console.log('beep...');
    }, 1000);
}

/**
 * 
 */
function startGame() {
    submit.style.visibility = 'hidden';
    showAnswers(false);
    questionElement.innerText = 'Welcome to the Gladiator Quizgame\nHere you will answer 5 questions about the Gladiator movie';
    addEventHandlers();
}

startGame();
