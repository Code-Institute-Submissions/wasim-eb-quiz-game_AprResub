// A list of questions and their answers. Only one answer per question is correct.

const quizData = [
    {
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
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');
  
let currentQuestion = 0;
let score = 0;

// Starts the game
loadQuestion();

// Sets up a new question for the quiz
function loadQuestion(){
    deselectAnswers();
  
    const currentQuizData = quizData[currentQuestion];
    
    // Sets up the current question and answers
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
}

// Deselects all the radio buttons
function deselectAnswers(){
    answerElements.forEach(answerEl => answerEl.checked = false)
}
// Gets the id of the selected radio button
function getSelected(){
    let answer;
    // Loops through every radio button to find the selected one
    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    // Returns the id number for the selected radio button
    return answer;
  }
  
// Defines the logic for the submit button (on-click)
submit.addEventListener('click', () => {
    // Gets the id number for the selected radio button
    const answer = getSelected();
    
    if(answer){
        // Compares the user's selected answer to the correct answer
        if(answer === quizData[currentQuestion].correct){
            // Adds one point to the score
            score++;
        }
        // Advances the question selector 
        currentQuestion++;
  
        // Checks if the end of the quiz has been reached
        if(currentQuestion < quizData.length){
            loadQuestion();
        }
        // Gives feedback to the player
        else{
            quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions</h2>
            <button onclick="location.reload()">Reload</button>
            `;
        }
    }
  });
  