// get all HTML DOM elements
const questionElement = document.querySelector(".question")
const answer_1_Element = document.querySelector("#question-1")
const answer_2_Element = document.querySelector("#question-2")
const answer_3_Element = document.querySelector("#question-3")
const answer_4_Element = document.querySelector("#question-4")
const buttonSubmit = document.querySelector("#submit")

// creata an array with objects
const dataObject = [
    {
        question: "What is my name?",
        answer_1 : "Adam",
        answer_2 : "Negor",
        answer_3 : "Michael",
        answer_4 : "Tom",
        correct_answer : "answer_2"
    },
    {
        question: "What is HTML?",
        answer_1 : "Hypertext Markup Language",
        answer_2 : "Cascade Stylesheet",
        answer_3 : "Application Programming Interfave",
        answer_4 : "None of the above",
        correct_answer : "answer_1"
    },
    {
        question: "What is CSS?",
        answer_1 : "Hypertext Markup Language",
        answer_2 : "Cascade Stylesheet",
        answer_3 : "Application Programming Interfave",
        answer_4 : "None of the above",
        correct_answer : "answer_2"
    },
    {
        question: "What is the most used programming language in 2023?",
        answer_1 : "Python",
        answer_2 : "JavaScript",
        answer_3 : "Java",
        answer_4 : "None of the above",
        correct_answer : "answer_2"
    },
    {
        question: "What is <body> element in HTML?",
        answer_1 : "Element that defines head of the HTML",
        answer_2 : "Element that defines script of the HTML",
        answer_3 : "Element that defines footer of the HTML",
        answer_4 : "Element that defines body of the HTML",
        correct_answer : "answer_4"
    },
    {
        question: "What does the 'href' attribute define in HTML?",
        answer_1: "The type of heading in the document",
        answer_2: "The color of the text",
        answer_3: "The hypertext reference of a link",
        answer_4: "The horizontal alignment of an element",
        correct_answer: "answer_3"
    }    
]
// create variables to track current question and score 
let currentQuestionIndex = 0
let score = 0

// initialize functions
loadQuestions()
deselectAnswers()

// function load questions that take current question of dataObject and show them to HTML
function loadQuestions(){
    const quizData = dataObject[currentQuestionIndex]
    questionElement.innerText = quizData.question
    answer_1_Element.innerText = quizData.answer_1
    answer_2_Element.innerText = quizData.answer_2
    answer_3_Element.innerText = quizData.answer_3
    answer_4_Element.innerText = quizData.answer_4
}

// function that checks the radio inputs in HTML and return undefined if answer is not checked
function selectAnswer(){
    const answers = document.querySelectorAll('.question-input')
    currentAnswer = undefined
    answers.forEach((answer) => {
        if(answer.checked){
            currentAnswer = answer.id
        }
    })
    return currentAnswer
}

// function deselectAnswers() that deselects all of the radio buttons in HTML 
function deselectAnswers() {
    const answers = document.querySelectorAll('.question-input')
    for(let i = 0; i < answers.length; i++) {
        answers[i].checked = false
    }
}

// add event listener to button that checks current answer from selectAnswer function and checks if that answer is correct, also it increments currentQuestion to load another question.
buttonSubmit.addEventListener('click', () => {
    const current_answer = selectAnswer()
    if(current_answer) {
        if(current_answer == dataObject[currentQuestionIndex].correct_answer){
            score++
        }
        currentQuestionIndex++
        if(currentQuestionIndex < dataObject.length){
            loadQuestions()
            deselectAnswers()
        } else{
            const quizCard = document.querySelector(".quiz-card")
            quizCard.innerHTML = `
            <h2>You answered ${score}/${dataObject.length} questions</h2> <br>
            <button onclick="location.reload()" id="submit">Refresh</button>
            `
        }
    }

})
