//question bank
var questionBank= [
    {
        question: 'Who played Marcus Aurelius?',
        option: ['James Franco', 'Joaquin Phoenix', 'Richard Harris', 'Russell Crowe'],
        answer: 'Richard Harris'
    },
    {
        question: 'Finish this quote: "At my signal, ______ hell."',
        option: ['release', 'unleash', 'enter', 'create'],
        answer: 'unleash'
    },
    {
        question: 'What 3-word phrase did soldiers say to each other as a sign of respect?',
        option: ['"Strength and Honor"', '"Justice and Alliance"', '"Power and Wisdom"', '"Might and Will"'],
        answer: '"Strength and Honor"'
    },
    {
        question: 'Why did Hagen try a bit of Maximus food?',
        option: [' He was hungry', 'He was greedy', 'To see if it was poisoned', 'Maximus did not want it'],
        answer: 'To see if it was poisoned'
    },
    {
        question: 'What was Maximus known as to the mob before everyone found out his name?',
        option: ['Spaniard', 'Maximus', 'General', 'Illidan'],
        answer: 'Spaniard'
    },
]

var question = document.getElementById
('question');
var quizContainer = document.getElementById
('quiz-container');
var scorecard = document.getElementById
('scorecard');
var option0 = document.getElementById
('option0');
var option0 = document.getElementById
('option1');
var option0 = document.getElementById
('option2');
var option0 = document.getElementById
('option3');
var options = document.querySelector('.next');
var points = document.getElementById('score');
var span = document.querySelectorAll('span');
var i=0;
var score = 0;


function displayQuestion() {
    for(var a=0;a<span.length;a++){
        span[a].style.background = 'none'
    }
    question.innerHTML = 'Q.'+(i+i)+' '
    +questionBank[i].question;
    option0.innerHTML = questionBank[1].option
    [0];
    option1.innerHTML = questionBank[1].option
    [1];
    option2.innerHTML = questionBank[1].option
    [2];
    option3.innerHTML = questionBank[1].option
    [3];
    stat.innerHTML = "Question"+' '+(i+i)+' '
    +'of'+' '+questionBank.length;
}

function calscore(e) {
    if(e.innerHTML===questionBank[i].answer &
        & score<questionBank.length)
        {
            score = score+1;
            document.getElementById(e.id).style.
            background = 'limegreen'
        } else {
            document.getElementById(e.id).style.
            background = 'tomato'
        }
        setTimeout(nextQuestion, 300);
}

function nextQuestion() {
    if(i<questionBank.length-1)
    {
        i=i+1;
        displayQuestion();
    } else {
        points.innerHTML = score+ '/'+
        questionBank.length;
        quizContainer.style.display = 'block'
    }
}

next.addEventListener('click', nextQuestion);


function backToQuiz() {
    location.reload();
}


function checkAnswer(){
    var answerBank = document.getElementById
    ('answerBank');
    var answers = document.getElementById
    ('answers');
    answerBank.style.display = 'block';
    scorecard.style.display = 'block';
    for(var a=0;a<questionBank.length;a++)
    {
        var list = document.createElement('li')
        ;
        list.innerHTML = questionBank[a].answer;
        answers.appendChild(list);
    }
}


displayQuestion