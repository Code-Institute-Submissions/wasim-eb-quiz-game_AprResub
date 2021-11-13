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
  
  const quiz = document.getElementById('quiz');
  const answerElements = document.querySelectorAll('.answer');
  const questionElement = document.getElementById('question');
  const a_text = document.getElementById('a_text');
  const b_text = document.getElementById('b_text');
  const c_text = document.getElementById('c_text');
  const submit = document.getElementById('submit');
  
  let currentQuiz = 0;
  let score = 0;
  
  loadQuiz();
  
  function loadQuiz(){
    deselectAnswers();
  
    const currentQuizData = quizData[currentQuiz];
  
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
  }
  
  function deselectAnswers(){
    answerElements.forEach(answerEl => answerEl.checked = false)
  }
  
  function getSelected(){
    let answer;
  
    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
  
    return answer;
  }
  
  submit.addEventListener('click', () => {
    const answer = getSelected();
  
    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }
  
        currentQuiz++;
  
        if(currentQuiz < quizData.length){
            loadQuiz();
        }
        else{
            quiz.innerHTML = `<h2>You answered corectly at ${score}/${quizData.length} questions</h2>
            <button onclick="location.reload()">Reload</button>
            `;
        }
    }
  });
  