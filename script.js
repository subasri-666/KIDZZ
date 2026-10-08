// ==========================================
// KIDZZ GAME JAVASCRIPT
// ==========================================

let score = 0;
let lives = 3;
let timer = 30;
let timerInterval;

let currentWord = "";


// ==========================================
// GAME ELEMENTS
// ==========================================

const gameModal = document.getElementById("gameModal");
const resultModal = document.getElementById("resultModal");

const gameTitle = document.getElementById("gameTitle");
const gameEmoji = document.getElementById("gameEmoji");

const gameScore = document.getElementById("gameScore");
const livesDisplay = document.getElementById("lives");
const timerDisplay = document.getElementById("timer");

const gameArea = document.getElementById("gameArea");

const finalScore = document.getElementById("finalScore");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");


// ==========================================
// QUESTION TRACKING
// ==========================================

let previousMathQuestion = "";
let previousColorQuestion = "";
let previousOddQuestion = "";
let previousSafetyQuestion = "";
let previousWordQuestion = "";


// ==========================================
// SHOW GAMES
// ==========================================

function showGames() {

    const gamesSection =
        document.getElementById("gamesSection");

    if (gamesSection) {

        gamesSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ==========================================
// OPEN GAME
// ==========================================

function openGame(title, emoji) {

    score = 0;
    lives = 3;
    timer = 30;

    gameTitle.textContent = title;
    gameEmoji.textContent = emoji;

    updateScore();
    updateLives();
    updateTimer();

    gameModal.style.display = "flex";

    clearInterval(timerInterval);

    startTimer();
}


// ==========================================
// CLOSE GAME
// ==========================================

function closeGame() {

    clearInterval(timerInterval);

    gameModal.style.display = "none";
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    timerInterval = setInterval(function () {

        timer--;

        updateTimer();

        if (timer <= 0) {

            endGame();

        }

    }, 1000);
}


function updateTimer() {

    if (timerDisplay) {

        timerDisplay.textContent = timer;

    }
}


// ==========================================
// SCORE
// ==========================================

function updateScore() {

    if (gameScore) {

        gameScore.textContent = score;

    }

    const totalScore =
        document.getElementById("totalScore");

    if (totalScore) {

        totalScore.textContent = score;

    }
}


function addScore(points) {

    score += points;

    updateScore();
}


// ==========================================
// LIVES
// ==========================================

function updateLives() {

    if (livesDisplay) {

        livesDisplay.textContent =
            "❤️".repeat(lives);

    }
}


function loseLife() {

    lives--;

    updateLives();

    if (lives <= 0) {

        endGame();

    }
}


// ==========================================
// END GAME
// ==========================================

function endGame() {

    clearInterval(timerInterval);

    gameModal.style.display = "none";

    finalScore.textContent = score;

    resultTitle.textContent = "🎉 Game Over!";

    resultText.textContent =
        "Great job! Your final score is " +
        score +
        "!";

    resultModal.style.display = "flex";
}


// ==========================================
// CLOSE RESULT
// ==========================================

function closeResult() {

    resultModal.style.display = "none";
}


// ==================================================
// 1. MATH BLAST
// ==================================================

function startMathGame() {

    openGame("Math Blast", "🧮");

    createMathQuestion();
}


function createMathQuestion() {

    let num1;
    let num2;
    let operation;
    let answer;
    let question;

    do {

        num1 =
            Math.floor(Math.random() * 20) + 1;

        num2 =
            Math.floor(Math.random() * 20) + 1;

        const operations = ["+", "-", "×"];

        operation =
            operations[
                Math.floor(
                    Math.random() * operations.length
                )
            ];

        if (operation === "+") {

            answer = num1 + num2;

        } else if (operation === "-") {

            if (num1 < num2) {

                let temp = num1;
                num1 = num2;
                num2 = temp;

            }

            answer = num1 - num2;

        } else {

            answer = num1 * num2;

        }

        question =
            num1 +
            " " +
            operation +
            " " +
            num2;

    } while (question === previousMathQuestion);

    previousMathQuestion = question;

    gameArea.innerHTML = `

        <h2 class="question">
            ${question} = ?
        </h2>

        <input
            type="number"
            id="mathAnswer"
            class="big-answer-box"
            placeholder="Type your answer"
        >

        <br><br>

        <button
            class="big-submit-btn"
            onclick="checkMathAnswer(${answer})"
        >
            CHECK ✓
        </button>

    `;

    document
        .getElementById("mathAnswer")
        .focus();
}


function checkMathAnswer(answer) {

    const input =
        document.getElementById("mathAnswer");

    if (Number(input.value) === answer) {

        addScore(10);

        gameArea.innerHTML = `

            <div class="success-message">

                <div class="big-emoji">
                    🎉
                </div>

                <h2>Correct Answer!</h2>

                <p>+10 Points</p>

                <button
                    class="big-submit-btn"
                    onclick="createMathQuestion()"
                >
                    NEXT QUESTION ➜
                </button>

            </div>

        `;

    } else {

        loseLife();

        if (lives > 0) {

            gameArea.innerHTML = `

                <div class="wrong-message">

                    <div class="big-emoji">
                        ❌
                    </div>

                    <h2>Oops!</h2>

                    <p>That's not correct.</p>

                    <button
                        class="big-submit-btn"
                        onclick="createMathQuestion()"
                    >
                        TRY AGAIN
                    </button>

                </div>

            `;

        }
    }
}


// ==================================================
// 2. COLOR RUSH
// ==================================================

function startColorGame() {

    openGame("Color Rush", "🎨");

    createColorQuestion();
}


function createColorQuestion() {

    const colors = [
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW",
        "PURPLE",
        "ORANGE"
    ];

    let randomColor;

    do {

        randomColor =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

    } while (randomColor === previousColorQuestion);

    previousColorQuestion = randomColor;

    window.correctColor = randomColor;

    gameArea.innerHTML = `

        <h2 class="question">
            Find the color:
        </h2>

        <div
            class="color-name"
            style="color:${randomColor.toLowerCase()}"
        >
            ${randomColor}
        </div>

        <div class="color-buttons">

            <button
                onclick="checkColor('RED')"
                class="color-option red"
            >
                🔴 RED
            </button>

            <button
                onclick="checkColor('BLUE')"
                class="color-option blue"
            >
                🔵 BLUE
            </button>

            <button
                onclick="checkColor('GREEN')"
                class="color-option green"
            >
                🟢 GREEN
            </button>

            <button
                onclick="checkColor('YELLOW')"
                class="color-option yellow"
            >
                🟡 YELLOW
            </button>

            <button
                onclick="checkColor('PURPLE')"
                class="color-option purple"
            >
                🟣 PURPLE
            </button>

            <button
                onclick="checkColor('ORANGE')"
                class="color-option orange"
            >
                🟠 ORANGE
            </button>

        </div>

    `;
}


function checkColor(color) {

    if (color === window.correctColor) {

        addScore(10);

        gameArea.innerHTML = `

            <div class="success-message">

                <div class="big-emoji">
                    🎨
                </div>

                <h2>Perfect!</h2>

                <p>+10 Points</p>

                <button
                    class="big-submit-btn"
                    onclick="createColorQuestion()"
                >
                    NEXT COLOR ➜
                </button>

            </div>

        `;

    } else {

        loseLife();

    }
}


// ==================================================
// 3. ODD ONE OUT
// ==================================================

function startOddGame() {

    openGame("Odd One Out", "🧐");

    createOddQuestion();
}


function createOddQuestion() {

    let numbers = [];

    let oddNumber;

    let questionKey;

    do {

        numbers = [];

        // Generate 4 EVEN numbers
        while (numbers.length < 4) {

            let number =
                Math.floor(Math.random() * 90) + 2;

            if (
                number % 2 === 0 &&
                !numbers.includes(number)
            ) {

                numbers.push(number);

            }

        }

        // Generate 1 ODD number
        do {

            oddNumber =
                Math.floor(Math.random() * 90) + 1;

        } while (
            oddNumber % 2 === 0 ||
            numbers.includes(oddNumber)
        );

        numbers.push(oddNumber);

        // Shuffle numbers
        numbers.sort(function () {

            return Math.random() - 0.5;

        });

        questionKey = numbers.join("-");

    } while (questionKey === previousOddQuestion);

    previousOddQuestion = questionKey;

    window.correctOddNumber = oddNumber;

    gameArea.innerHTML = `

        <h2 class="question">
            🔎 Find the Odd Number
        </h2>

        <p class="instruction">
            One number is different from the others!
        </p>

        <div class="odd-number-grid">

            ${numbers.map(function(number) {

                return `

                    <button
                        class="odd-number-btn"
                        onclick="checkOdd(${number})"
                    >
                        ${number}
                    </button>

                `;

            }).join("")}

        </div>

    `;
}


function checkOdd(number) {

    if (number === window.correctOddNumber) {

        addScore(10);

        gameArea.innerHTML = `

            <div class="success-message">

                <div class="big-emoji">
                    🏆
                </div>

                <h2>Excellent!</h2>

                <p>
                    ${number} was the odd number!
                </p>

                <p>+10 Points</p>

                <button
                    class="big-submit-btn"
                    onclick="createOddQuestion()"
                >
                    NEXT QUESTION ➜
                </button>

            </div>

        `;

    } else {

        loseLife();

    }
}


// ==================================================
// 4. SAFETY GAME
// ==================================================

function startSafetyGame() {

    openGame("Safe or Not?", "🛡️");

    createSafetyQuestion();
}


function createSafetyQuestion() {

    const questions = [

        {
            text:
                "Should you tell your password to a stranger?",
            answer: "NO"
        },

        {
            text:
                "Should you wear a helmet while riding?",
            answer: "YES"
        },

        {
            text:
                "Should you share your home address with strangers online?",
            answer: "NO"
        },

        {
            text:
                "Should you tell a trusted adult if something online scares you?",
            answer: "YES"
        },

        {
            text:
                "Should you meet an online stranger alone?",
            answer: "NO"
        },

        {
            text:
                "Should you ask an adult before downloading an unknown app?",
            answer: "YES"
        }

    ];

    let question;

    do {

        question =
            questions[
                Math.floor(
                    Math.random() * questions.length
                )
            ];

    } while (
        question.text === previousSafetyQuestion
    );

    previousSafetyQuestion = question.text;

    window.correctSafetyAnswer =
        question.answer;

    gameArea.innerHTML = `

        <h2 class="question">
            🛡️ Safe or Not?
        </h2>

        <div class="safety-question">
            ${question.text}
        </div>

        <div class="yes-no-buttons">

            <button
                class="yes-btn"
                onclick="checkSafety('YES')"
            >
                ✅ YES
            </button>

            <button
                class="no-btn"
                onclick="checkSafety('NO')"
            >
                ❌ NO
            </button>

        </div>

    `;
}


function checkSafety(answer) {

    if (answer === window.correctSafetyAnswer) {

        addScore(10);

        gameArea.innerHTML = `

            <div class="success-message">

                <div class="big-emoji">
                    🛡️
                </div>

                <h2>Great Choice!</h2>

                <p>+10 Points</p>

                <button
                    class="big-submit-btn"
                    onclick="createSafetyQuestion()"
                >
                    NEXT QUESTION ➜
                </button>

            </div>

        `;

    } else {

        loseLife();

    }
}


// ==================================================
// 5. MEMORY MATCH
// ==================================================

let memoryCards = [];
let firstMemoryCard = null;
let secondMemoryCard = null;
let memoryLocked = false;
let memoryMatched = 0;

let previousMemorySet = "";


function startMemoryGame() {

    openGame("Memory Match", "🧠");

    setupMemoryGame();
}


function setupMemoryGame() {

    // Different picture collection
    const pictures = [
        "🐶",
        "🐱",
        "🦁",
        "🐯",
        "🐸",
        "🐼",
        "🐵",
        "🐰",
        "🦊",
        "🐨",
        "🐷",
        "🐮",
        "🐙",
        "🦄",
        "🐝",
        "🦋"
    ];

    let selectedPictures;
    let setKey;

    do {

        selectedPictures = [...pictures];

        selectedPictures.sort(function () {

            return Math.random() - 0.5;

        });

        selectedPictures =
            selectedPictures.slice(0, 6);

        setKey =
            selectedPictures.join("");

    } while (
        setKey === previousMemorySet
    );

    previousMemorySet = setKey;

    // Create pairs
    memoryCards = [
        ...selectedPictures,
        ...selectedPictures
    ];

    // Shuffle cards
    memoryCards.sort(function () {

        return Math.random() - 0.5;

    });

    firstMemoryCard = null;
    secondMemoryCard = null;
    memoryLocked = false;
    memoryMatched = 0;

    gameArea.innerHTML = `

        <h2 class="question">
            🧠 Match the Pictures
        </h2>

        <p class="instruction">
            Click two cards to find the matching pictures!
        </p>

        <div class="memory-grid">

            ${memoryCards.map(function(picture, index) {

                return `

                    <button
                        class="memory-card"
                        id="memory-card-${index}"
                        onclick="flipMemoryCard(${index})"
                    >
                        <span class="card-question">
                            ❓
                        </span>

                        <span
                            class="card-picture"
                            style="display:none"
                        >
                            ${picture}
                        </span>

                    </button>

                `;

            }).join("")}

        </div>

    `;
}


// ==========================================
// FLIP MEMORY CARD
// ==========================================

function flipMemoryCard(index) {

    // Don't allow clicking while checking pair
    if (memoryLocked) {

        return;

    }

    // Don't allow clicking same card twice
    if (
        firstMemoryCard === index
    ) {

        return;

    }

    const card =
        document.getElementById(
            "memory-card-" + index
        );

    if (!card) {

        return;

    }

    // Already matched card
    if (
        card.classList.contains("matched")
    ) {

        return;

    }

    // Show picture
    const questionMark =
        card.querySelector(".card-question");

    const picture =
        card.querySelector(".card-picture");

    if (questionMark) {

        questionMark.style.display = "none";

    }

    if (picture) {

        picture.style.display = "block";

    }

    card.classList.add("flipped");

    // First card
    if (firstMemoryCard === null) {

        firstMemoryCard = index;

        return;
    }

    // Second card
    secondMemoryCard = index;

    memoryLocked = true;

    checkMemoryMatch();
}


// ==========================================
// CHECK MEMORY MATCH
// ==========================================

function checkMemoryMatch() {

    const first =
        memoryCards[firstMemoryCard];

    const second =
        memoryCards[secondMemoryCard];

    const firstCard =
        document.getElementById(
            "memory-card-" + firstMemoryCard
        );

    const secondCard =
        document.getElementById(
            "memory-card-" + secondMemoryCard
        );


    if (first === second) {

        // MATCH
        firstCard.classList.add("matched");

        secondCard.classList.add("matched");

        addScore(20);

        memoryMatched++;

        firstMemoryCard = null;
        secondMemoryCard = null;

        memoryLocked = false;

        // All 6 pairs completed
        if (memoryMatched === 6) {

            setTimeout(function() {

                endGame();

            }, 600);

        }

    } else {

        // NOT MATCHED
        setTimeout(function() {

            hideMemoryCard(firstCard);

            hideMemoryCard(secondCard);

            firstMemoryCard = null;
            secondMemoryCard = null;

            memoryLocked = false;

        }, 900);

    }
}


// ==========================================
// HIDE MEMORY CARD
// ==========================================

function hideMemoryCard(card) {

    if (!card) {

        return;

    }

    const questionMark =
        card.querySelector(".card-question");

    const picture =
        card.querySelector(".card-picture");

    if (questionMark) {

        questionMark.style.display = "block";

    }

    if (picture) {

        picture.style.display = "none";

    }

    card.classList.remove("flipped");
}


// ==================================================
// 6. WORD SCRAMBLE
// ==================================================

function startWordGame() {

    openGame("Word Scramble", "🔤");

    createWordQuestion();
}


function createWordQuestion() {

    const words = [

        "APPLE",
        "MANGO",
        "TIGER",
        "HOUSE",
        "WATER",
        "SCHOOL",
        "FLOWER",
        "GARDEN",
        "MONKEY",
        "ORANGE",
        "BANANA",
        "PENCIL"

    ];

    let word;

    do {

        word =
            words[
                Math.floor(
                    Math.random() * words.length
                )
            ];

    } while (
        word === previousWordQuestion
    );

    previousWordQuestion = word;

    currentWord = word;

    let scrambled;

    do {

        scrambled =
            word
                .split("")
                .sort(function() {

                    return Math.random() - 0.5;

                })
                .join("");

    } while (
        scrambled === word
    );


    gameArea.innerHTML = `

        <h2 class="question">
            🔤 Unscramble This Word
        </h2>

        <div class="scramble">
            ${scrambled}
        </div>

        <input
            type="text"
            id="wordInput"
            class="big-answer-box"
            placeholder="Type your answer"
        >

        <br><br>

        <button
            class="big-submit-btn"
            onclick="checkWord()"
        >
            CHECK ✓
        </button>

    `;

    document
        .getElementById("wordInput")
        .focus();
}


function checkWord() {

    const input =
        document.getElementById("wordInput");

    const answer =
        input.value
            .trim()
            .toUpperCase();


    if (answer === currentWord) {

        addScore(15);

        gameArea.innerHTML = `

            <div class="success-message">

                <div class="big-emoji">
                    🎉
                </div>

                <h2>Correct!</h2>

                <p>
                    +15 Points
                </p>

                <button
                    class="big-submit-btn"
                    onclick="createWordQuestion()"
                >
                    NEXT WORD ➜
                </button>

            </div>

        `;

    } else {

        loseLife();

        if (lives > 0) {

            gameArea.innerHTML = `

                <div class="wrong-message">

                    <div class="big-emoji">
                        ❌
                    </div>

                    <h2>Try Again!</h2>

                    <p>
                        Think carefully!
                    </p>

                    <button
                        class="big-submit-btn"
                        onclick="createWordQuestion()"
                    >
                        NEW WORD
                    </button>

                </div>

            `;

        }
    }
}


// ==================================================
// LANGUAGE
// ==================================================

function changeLanguage() {

    const languageSelect =
        document.getElementById(
            "languageSelect"
        );

    if (!languageSelect) {

        return;

    }

    const language =
        languageSelect.value;

    const heroText =
        document.getElementById(
            "heroText"
        );

    const gamesTitle =
        document.getElementById(
            "gamesTitle"
        );

    const gamesSubtitle =
        document.getElementById(
            "gamesSubtitle"
        );


    if (language === "ta") {

        if (heroText) {

            heroText.textContent =
                "குழந்தைகளுக்கான வேடிக்கையான விளையாட்டு உலகம்!";

        }

        if (gamesTitle) {

            gamesTitle.textContent =
                "விளையாட்டுகள்";

        }

        if (gamesSubtitle) {

            gamesSubtitle.textContent =
                "விளையாடுங்கள், கற்றுக்கொள்ளுங்கள், மகிழுங்கள்!";

        }

    }

    else if (language === "hi") {

        if (heroText) {

            heroText.textContent =
                "बच्चों के लिए मजेदार गेम की दुनिया!";

        }

        if (gamesTitle) {

            gamesTitle.textContent =
                "खेल";

        }

        if (gamesSubtitle) {

            gamesSubtitle.textContent =
                "खेलें, सीखें और मज़े करें!";

        }

    }

    else {

        if (heroText) {

            heroText.textContent =
                "A Fun World of Games for Kids!";

        }

        if (gamesTitle) {

            gamesTitle.textContent =
                "Choose Your Game";

        }

        if (gamesSubtitle) {

            gamesSubtitle.textContent =
                "Play, Learn and Have Fun!";

        }

    }
}


// ==================================================
// ESCAPE KEY
// ==================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeGame();
            closeResult();

        }

    }
);