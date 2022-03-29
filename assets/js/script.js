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

// Creates variables for the various html elements
const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const answerLabelElements = document.querySelectorAll('.answer-label');
const questionElement = document.getElementById('question');
const submit = document.getElementById('submit');
const playgame = document.getElementById('playgame');
const stats = document.getElementById('stats');
let currentQuestion = 0;
let score = 0;
let intervalId = null;

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
                // Applicera en formel här
                currentScore = 0
                if (currentScore > localStorage.getItem('highscore')) {
                    localStorage.setItem('highscore', currentScore)
                }
                // intervalID keeps track of the time in seconds
                quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions</h2>
                <h2>You scored ${currentScore} points</h2>
                <button onclick="location.reload()">Start again</button>
                `;
            }
        }
    });
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
