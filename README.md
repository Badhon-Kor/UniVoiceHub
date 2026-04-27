const questionSets = {
    set1: [
        { q: "Which one is the letter 'A'?", opt: ["A", "B", "C", "D"], ans: "A", t: 10 },
        { q: "1 + 1 = ?", opt: ["1", "2", "3", "4"], ans: "2", t: 10 },
        { q: "Identify the Bird:", img: "https://cdn-icons-png.flaticon.com/512/2970/2970104.png", opt: ["Bird", "Fish", "Cat", "Lion"], ans: "Bird", t: 12 },
        { q: "5 - 2 = ?", opt: ["2", "3", "4", "5"], ans: "3", t: 10 },
        { q: "What is the color of a Banana?", opt: ["Red", "Blue", "Yellow", "Green"], ans: "Yellow", t: 10 },
        { q: "Which one is 'S'?", opt: ["P", "Q", "R", "S"], ans: "S", t: 10 },
        { q: "3 + 2 = ?", opt: ["4", "5", "6", "7"], ans: "5", t: 10 },
        { q: "Which animal says 'Meow'?", opt: ["Dog", "Cat", "Cow", "Hen"], ans: "Cat", t: 12 },
        { q: "4 x 2 = ?", opt: ["6", "7", "8", "9"], ans: "8", t: 10 },
        { q: "The sky is ___?", opt: ["Green", "Blue", "Red", "Black"], ans: "Blue", t: 10 }
    ],
    set2: [
        { q: "Which one is 'G'?", opt: ["E", "F", "G", "H"], ans: "G", t: 10 },
        { q: "2 + 3 = ?", opt: ["4", "5", "6", "7"], ans: "5", t: 10 },
        { q: "What fruit is this?", img: "https://png.pngtree.com/png-vector/20250501/ourmid/pngtree-ripe-mango-fruit-with-leaf-for-healthy-snack-png-image_16169885.png", opt: ["Apple", "Mango", "Banana", "Grapes"], ans: "Mango", t: 12 },
        { q: "10 - 5 = ?", opt: ["4", "5", "6", "7"], ans: "5", t: 10 },
        { q: "What color is Milk?", opt: ["White", "Black", "Red", "Blue"], ans: "White", t: 10 },
        { q: "8 ÷ 2 = ?", opt: ["2", "4", "6", "8"], ans: "4", t: 12 },
        { q: "Which one is 'Z'?", opt: ["X", "Y", "W", "Z"], ans: "Z", t: 10 },
        { q: "A Cow gives us ___?", opt: ["Egg", "Milk", "Honey", "Oil"], ans: "Milk", t: 10 },
        { q: "6 + 4 = ?", opt: ["9", "10", "11", "12"], ans: "10", t: 10 },
        { q: "Solve: (2 + 2) x 1", opt: ["2", "3", "4", "5"], ans: "4", t: 15 }
    ],
    set3: [
        { q: "Which one is 'M'?", opt: ["L", "M", "N", "O"], ans: "M", t: 10 },
        { q: "7 + 1 = ?", opt: ["7", "8", "9", "10"], ans: "8", t: 10 },
        { q: "Identify the animal:", img: "https://img.freepik.com/free-photo/closeup-shot-beautiful-ginger-domestic-kitten-sitting-white-surface_181624-35913.jpg?semt=ais_hybrid&w=740&q=80", opt: ["Cat", "Dog", "Tiger", "Lion"], ans: "Cat", t: 12 },
        { q: "9 - 3 = ?", opt: ["5", "6", "7", "8"], ans: "6", t: 10 },
        { q: "What is the color of Grass?", opt: ["Green", "Red", "Yellow", "Black"], ans: "Green", t: 10 },
        { q: "5 x 3 = ?", opt: ["10", "12", "15", "20"], ans: "15", t: 12 },
        { q: "Which number is bigger?", opt: ["10", "20"], ans: "20", t: 10 },
        { q: "Solve: 10 - 2 + 3", opt: ["5", "8", "11", "15"], ans: "11", t: 15 },
        { q: "Opposite of 'Hot' is?", opt: ["Cold", "Warm", "Fire", "Sun"], ans: "Cold", t: 10 },
        { q: "Which one is 'R'?", opt: ["P", "R", "B", "D"], ans: "R", t: 10 }
    ],
    set4: [
        { q: "Which one is 'Q'?", opt: ["O", "P", "Q", "R"], ans: "Q", t: 10 },
        { q: "6 ÷ 3 = ?", opt: ["1", "2", "3", "4"], ans: "2", t: 12 },
        { q: "Identify the Flower:", img: "https://img.freepik.com/free-vector/bright-sunflower-vector-illustration-with-green-leaves_1308-182160.jpg?semt=ais_hybrid&w=740&q=80", opt: ["Rose", "Sunflower", "Lily", "Lotus"], ans: "Sunflower", t: 12 },
        { q: "12 + 4 = ?", opt: ["14", "15", "16", "17"], ans: "16", t: 10 },
        { q: "How many colors in a Rainbow?", opt: ["5", "6", "7", "8"], ans: "7", t: 10 },
        { q: "Solve: 5 x (2 + 1)", opt: ["10", "15", "20", "25"], ans: "15", t: 15 },
        { q: "A Dog says ___?", opt: ["Meow", "Woof", "Moo", "Quack"], ans: "Woof", t: 10 },
        { q: "Small letter of 'A' is?", opt: ["A", "a", "B", "b"], ans: "a", t: 10 },
        { q: "20 - 10 = ?", opt: ["5", "10", "15", "20"], ans: "10", t: 10 },
        { q: "We live on planet ___?", opt: ["Mars", "Earth", "Moon", "Sun"], ans: "Earth", t: 10 }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let lastSetKey = "";

const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const optionsContainer = document.getElementById("options-container");
const timeLeftDisplay = document.getElementById("time-left");
const currentScoreDisplay = document.getElementById("current-score");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

function selectRandomSet() {
    const setKeys = Object.keys(questionSets);
    let randomKey;
    do {
        randomKey = setKeys[Math.floor(Math.random() * setKeys.length)];
    } while (randomKey === lastSetKey);
    lastSetKey = randomKey;
    currentQuestions = questionSets[randomKey];
}

function startQuiz() {
    clearInterval(timer);
    selectRandomSet();
    currentQuestionIndex = 0;
    score = 0;
    currentScoreDisplay.innerText = score;
    gameScreen.style.display = "block";
    resultScreen.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    const q = currentQuestions[currentQuestionIndex];
    questionText.innerText = q.q;
    if (q.img) {
        questionImage.src = q.img;
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }
    timeLeft = q.t;
    timeLeftDisplay.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver(`Time Up! Correct answer: ${q.ans}`);
        }
    }, 1000);
    optionsContainer.innerHTML = "";
    q.opt.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, btn); 
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, btnElement) {
    const q = currentQuestions[currentQuestionIndex];
    const correct = q.ans;
    clearInterval(timer);
    const allButtons = optionsContainer.querySelectorAll("button");
    allButtons.forEach(btn => btn.style.pointerEvents = "none");
    if (selected === correct) {
        btnElement.classList.add("correct-flash");
        score += 10;
        currentScoreDisplay.innerText = score;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
            } else {
                gameOver("Amazing! You finished all questions! 🎉");
            }
        }, 1000);
    } else {
        btnElement.classList.add("wrong-flash");
        allButtons.forEach(btn => {
            if (btn.innerText === correct) btn.classList.add("correct-flash");
        });
        setTimeout(() => {
            gameOver(`Wrong! The correct answer was: ${correct} ❌`);
        }, 1500);
    }
}
function goHome() {
    window.location.href = "home.html";
}

function gameOver(msg) {
    clearInterval(timer);
    gameScreen.style.display = "none";
    resultScreen.classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
    document.getElementById("correct-info").innerText = msg;
}

startQuiz();