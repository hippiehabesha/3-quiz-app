const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "blue whale", correct: false },
      { text: "your mama", correct: true },
      { text: "elephant", correct: false },
    ],
  },
  {
    question: "What is the tallest building in the world?",
    answers: [
      { text: "Eiffel Tower", correct: false },
      { text: "Burj Khalifa", correct: true },
      { text: "Empire State Building", correct: false },
      { text: "Taj Mahal", correct: false },
    ],
  },
  {
    question: "What is the fastest animal?",
    answers: [
      { text: "Cheetah", correct: true },
      { text: "Eagle", correct: false },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer_btn");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML =
    "You scored " + score + " out of " + questions.length;
  nextButton.innerHTML = "play again!";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
