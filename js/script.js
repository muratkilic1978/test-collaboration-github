"use strict";

const numberOfBalls = 10;
let numberOfClickedBalls = 0;
let randomNumbersArray = [];
let gameOver = false;
let startTime;
const ballPositionRangeLeft = 700;
const ballPositionRangeTop = 400;

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createBall() {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.left = randomRange(0, ballPositionRangeLeft) + "px";
    ball.style.top = randomRange(0, ballPositionRangeTop) + "px";
    
    const randomNumber = randomRange(1, 100);
    ball.innerText = randomNumber;
    randomNumbersArray.push(randomNumber);

    ball.addEventListener("click", clickBall);
    return ball;
}

function clearBalls() {
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        ball.removeEventListener("click", clickBall);
        document.body.removeChild(ball);
    });
    numberOfClickedBalls = 0;
    updateScoreBoard();
}

function updateScoreBoard() {
    document.querySelector(".scoreboard").textContent = numberOfClickedBalls;
}

function clickBall(e) {


    const ball = e.currentTarget;
    const ballId = parseInt(ball.innerText);
    // Check if the BallId is odd
    if (ballId % 2 !== 0) {
        // Remove the ball and its event listener
        ball.removeEventListener("click", clickBall);
        document.body.removeChild(ball);

        // Remove the corresponding number from randomNumbersArray
        const indexToRemove = randomNumbersArray.indexOf(ballId);
        if (indexToRemove !== -1) {
            randomNumbersArray.splice(indexToRemove, 1);
        }

        // Log the updated randomNumbersArray
        console.log(randomNumbersArray);

        // Increment the score only for odd BallId
        numberOfClickedBalls++;
        updateScoreBoard();
    }

    // Check if there are no more odd numbers left
    const remainingOddNumbers = randomNumbersArray.filter(num => num % 2 !== 0).length;
    if (remainingOddNumbers === 0) {
        // Display the message only if no more odd numbers are left
        displayGameOverMessage();
    }
}

function displayGameOverMessage() {
    const gameDuration = (new Date() - startTime) / 1000;
    const finalMessage = `GAME OVER. No more odd numbers left to click! You took ${gameDuration} seconds to click all the balls.`;
    document.querySelector(".message").textContent = finalMessage;
    clearInterval(intervalId);
    console.log(randomNumbersArray);

    gameOver = true;
}

function startGame() {
    document.querySelector(".message").textContent = "";
    startTime = new Date();
    clearBalls();
    
    for (let i = 0; i < numberOfBalls; i++) {
        const ball = createBall();
        document.body.appendChild(ball);
    }
    console.log(randomNumbersArray);
}
