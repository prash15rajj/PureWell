const foodItems = document.querySelectorAll('.food-item');
const dropzones = document.querySelectorAll('.dropzone');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const levelElement = document.getElementById('level');
const hintElement = document.getElementById('hint');
let score = 0;
let timeLeft = 60;
let level = 1;

const hints = [
    "Did you know? Vegetables are rich in vitamins!",
    "Fruits are a great source of natural sugars.",
    "Proteins help build and repair tissues.",
    "Grains provide essential carbs for energy."
];

foodItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('dragenter', dragEnter);
    zone.addEventListener('dragleave', dragLeave);
    zone.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    setTimeout(() => {
        e.target.classList.add('invisible');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('invisible');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
}

function dragLeave(e) {
    e.target.classList.remove('hovered');
}

function drop(e) {
    e.target.classList.remove('hovered');

    const foodType = e.dataTransfer.getData('text/plain');
    const dropzoneType = e.target.dataset.type;

    if (foodType === dropzoneType) {
        e.target.classList.add('correct');
        e.target.classList.remove('incorrect');
        const draggedElement = document.querySelector(`[data-type='${foodType}']`);
        e.target.appendChild(draggedElement);
        updateScore(10);
        displayFeedback("Correct!", "green");
        checkLevelProgress();
    } else {
        e.target.classList.add('incorrect');
        e.target.classList.remove('correct');
        updateScore(-5);
        displayFeedback("Incorrect! Try again.", "red");
    }
}

function updateScore(points) {
    score += points;
    scoreElement.textContent = `Score: ${score}`;
}

function displayFeedback(message, color) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
    setTimeout(() => {
        feedbackElement.textContent = '';
    }, 2000);
}

function displayHint() {
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    hintElement.textContent = randomHint;
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function checkLevelProgress() {
    const remainingItems = document.querySelectorAll('.food-item:not(.invisible)');
    if (remainingItems.length === 0) {
        level++;
        levelElement.textContent = `Level: ${level}`;
        loadNextLevel();
    }
}

function loadNextLevel() {
    // Remove existing food items
    document.getElementById('food-items').innerHTML = '';

    // Define new food items for next level
    const newFoodItems = [
        { type: 'Vegetables', name: 'Carrot' },
        { type: 'Fruits', name: 'Banana' },
        { type: 'Proteins', name: 'Fish' },
        { type: 'Grains', name: 'Bread' }
    ];

    newFoodItems.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');
        foodDiv.setAttribute('draggable', 'true');
        foodDiv.setAttribute('data-type', item.type);
        foodDiv.textContent = item.name;
        foodDiv.addEventListener('dragstart', dragStart);
        foodDiv.addEventListener('dragend', dragEnd);
        document.getElementById('food-items').appendChild(foodDiv);
    });

    displayHint();
}

function endGame() {
    feedbackElement.textContent = "Time's up! Your final score is " + score;
    feedbackElement.style.color = "blue";
    document.querySelectorAll('.food-item').forEach(item => {
        item.setAttribute('draggable', 'false');
    });
}

startTimer();
displayHint();
