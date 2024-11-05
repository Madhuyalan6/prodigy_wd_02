// Variables to keep track of time
let startTime, elapsedTime = 0, intervalID;
let isRunning = false;

// DOM Elements
const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalID = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

// Function to pause the timer
function pauseTimer() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalID);
        isRunning = false;
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(intervalID);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00.000";
    laps.innerHTML = "";  // Clear the lap list
}

// Function to record a lap
function recordLap() {
    if (isRunning) {
        const li = document.createElement("li");
        li.textContent = display.textContent;
        laps.appendChild(li);
    }
}

// Function to update the display
function updateDisplay() {
    const currentTime = Date.now();
    const timeDifference = currentTime - startTime;

    const milliseconds = Math.floor(timeDifference % 1000);
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

// Function to pad numbers with leading zeros
function pad(number, digits = 2) {
    return number.toString().padStart(digits, "0");
}
