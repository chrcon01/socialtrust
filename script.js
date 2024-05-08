
// Quiz social engineering
const questions = [
    {
        question: "Spørgsmål: Hvad er phishing?",
        answers: [
            {text: "a) En fiske metode", isCorrect: false},
            {text: "b) En måde at organisere data på", isCorrect: false},
            {text: "c) Et computerspil", isCorrect: false},
            {text: "d) En type digital svindel, hvor svindlere prøver at lokke personlige oplysninger ud af dig", isCorrect: true}
        ]
    },
    {
        question: "Spørgsmål: Hvad er smishing?",
        answers: [
            {text: "a) Phishing via SMS", isCorrect: true},
            {text: "b) En dating app", isCorrect: false},
            {text: "c) Social media phishing", isCorrect: false},
            {text: "d) En dessert", isCorrect: false}
        ]
    },
    {
        question: "Spørgsmål: Vælg det svar, der bedst beskriver en phishing e-mail",
        answers: [
            {text: "a) E-mail anmoder om følsomme personlige oplysninger", isCorrect: true},
            {text: "b) E-mail er fra en fiskeforretning", isCorrect: false},
            {text: "c) E-mailen er uden indhold", isCorrect: false},
            {text: "d) Der er ingen grammatiske fejl og fremstår professionel", isCorrect: false}
        ]
    },
    {
        question: "Spørgsmål: Hvordan kan du sikre dig, at en e-mail virkelig er fra den person eller organisation, den hævder at være fra?",
        answers: [
            {text: "a) Ved at spørge afsenderen direkte", isCorrect: false},
            {text: "b) Ved at klikke på links i e-mailen for at bekræfte deres ægthed", isCorrect: false},
            {text: "c) Kontakte organisationen via et telefonnummer fundet på deres officielle hjemmeside", isCorrect: true},
            {text: "d) Der er ingen grammatiske fejl og fremstår professionel", isCorrect: false}
        ]
    },
    {
        question: "Spørgsmål: Hvad skal du gøre hvis du modtager en mistænkelig e-mail?",
        answers: [
            {text: "Udføre instrukserne i e-mailen, selvom der bedes om personlige oplysninger", isCorrect: false},
            {text: "b) Ignorere e-mailen og slette den", isCorrect: true},
            {text: "c) Videresende e-mailen", isCorrect: false},
            {text: "d) Spørge afsenderen direkte", isCorrect: false}
        ]
    }
];

const questionElement = document.getElementById("quest");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("btn_next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Næste →";
    nextButton.removeEventListener('click', startQuiz); 
    nextButton.addEventListener('click', handleNextButton);
    showQuestion();
}

function updateProgressBar() {
    const totalSections = 5;
    const questionsPerSection = Math.ceil(questions.length / totalSections);
    const completedSections = Math.floor((currentQuestionIndex + 1) / questionsPerSection);
    const progressWidth = (completedSections / totalSections) * 100;
    console.log(`Progress Width: ${progressWidth}%`); 
    document.getElementById("progress-bar").style.width = progressWidth + "%";
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.isCorrect) {
            button.dataset.correct = answer.isCorrect;
        }
        button.addEventListener('click', function(e)  {
            selectAnswer(e);
            updateProgressBar(); 
        });   
        answerButtons.appendChild(button);
    });
    updateProgressBar();
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    selectedButton.classList.add(isCorrect ? "rigtig" : "forkert");
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("rigtig");
        }
        button.disabled = true;
    });
    if (isCorrect) {
        score++;
    }
    nextButton.style.display = "block";
}

    function showScore(){
        resetState();
        questionElement.innerHTML = `Din score er ${score} ud af ${questions.length}. 
        <br>
        <br>
        Tak, fordi du tog vores quiz! Forhåbentlig har du fået en lille fornemmelse af hvad Phishing er, og hvordan du kan beskytte dig selv. Husk altid at tænke dig om.`;
        nextButton.innerHTML = "Prøv igen";
        nextButton.style.display = 'block';
        nextButton.removeEventListener('click', handleNextButton);
        nextButton.addEventListener('click', startQuiz);
    }
    
    function handleNextButton() {
        currentQuestionIndex++;  
        if (currentQuestionIndex < questions.length) {
            showQuestion();  
        } else {
            showScore();    
        }
    }

    document.addEventListener('DOMContentLoaded', startQuiz);

       // branching scenario (jeg har brugt chatgpt til hjælp, når jeg var i tvivl)

var currentScene = 1;

document.querySelectorAll('.knap').forEach(function(button) {
    button.addEventListener('click', function() {
        nextScene();
    });
});

document.querySelectorAll('.valg1').forEach(function(button) {
    button.addEventListener('click', function() {
        selectOption('A');
    });
});

document.querySelectorAll('.valg').forEach(function(button) {
    button.addEventListener('click', function() {
        selectOption('B');
    });
});

function nextScene() {
    document.getElementById('scene' + currentScene).style.display = 'none';
    currentScene++;
    document.getElementById('scene' + currentScene).style.display = 'block';
}

function selectOption(option) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('scene' + i).style.display = 'none';
    }
    if (option === 'A') {
        currentScene = 3; 
    } else if (option === 'B') {
        currentScene = 4; 
    }
    document.getElementById('scene' + (currentScene - 1)).style.display = 'none';
    document.getElementById('scene' + currentScene).style.display = 'block';
}

const restartButtonA = document.getElementById('restartButtonA');
const restartButtonB = document.getElementById('restartButtonB');

restartButtonA.addEventListener('click', restartScene);
restartButtonB.addEventListener('click', restartScene);

function restartScene() {
    console.log('Restart button clicked');

    currentScene = 1;

    document.querySelectorAll('.bs_con').forEach(function(scene) {
        scene.style.display = 'none';
    });
    document.getElementById('scene1').style.display = 'block';
}

    // pil op 

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


