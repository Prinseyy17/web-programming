// Game Variables
let correctColor;
let lives = 3;
let score = 0;

// HTML Element References
const rgbValue = document.getElementById('rgb-value');
const colorOptions = document.getElementById('color-options');
const feedback = document.getElementById('feedback');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const replayBtn = document.getElementById('replay');

// Generate a random RGB color string
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Start or Reset the Game Round
function startGame() {
    feedback.textContent = '';
    colorOptions.innerHTML = '';

    // Generate the correct color
    correctColor = randomColor();
    rgbValue.textContent = correctColor;

    // Generate color options (1 correct, 2 wrong)
    const options = [correctColor, randomColor(), randomColor()];
    // Shuffle options randomly
    options.sort(() => Math.random() - 0.5);

    // Create clickable color boxes
    options.forEach(color => {
        const box = document.createElement('div');
        box.classList.add('color-box');
        box.style.backgroundColor = color;
        box.onclick = () => checkAnswer(color);
        colorOptions.appendChild(box);
    });
}

// Check User's Answer
function checkAnswer(selectedColor) {
    if (selectedColor === correctColor) {
        feedback.textContent = "✅ Correct!";
        score++;
    } else {
        feedback.textContent = "❌ Incorrect!";
        lives--;
    }

    // Update Score and Lives
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;

    // Check if Game Over
    if (lives > 0) {
        setTimeout(startGame, 1000);
    } else {
        endGame();
    }
}

// End Game and Show Replay Button
function endGame() {
    feedback.textContent = `Game Over! Final Score: ${score}`;
    replayBtn.style.display = 'inline-block';
}

// Restart Game
replayBtn.onclick = () => {
    lives = 3;
    score = 0;
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    replayBtn.style.display = 'none';
    startGame();
};

// Initialize Game
startGame();
