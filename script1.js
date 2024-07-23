// Variables to hold the time values
let startTime;
let currentTime;
let elapsedTime = 0;
let timerInterval;

// Variables for lap functionality
let laps = [];
let lapsList = document.getElementById('laps');

// Display element
let display = document.getElementById('display');

// Start or stop the stopwatch
function startStop() {
    if (!timerInterval) {
        // Start the stopwatch
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById('startStopButton').textContent = 'Stop';
        document.getElementById('lapButton').textContent = 'Lap';
    } else {
        // Stop the stopwatch
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('startStopButton').textContent = 'Start';
        document.getElementById('lapButton').textContent = 'Reset';
    }
}

// Update the stopwatch time
function updateTime() {
    currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Format time as hh:mm:ss.SSS
function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
}

// Record lap time
function lap() {
    if (timerInterval) {
        // Get current lap time
        let lapTime = formatTime(elapsedTime);
        
        // Add lap to list
        laps.unshift(lapTime); // Add lap at the beginning of the array
        renderLaps();
    } else {
        // Reset the stopwatch
        elapsedTime = 0;
        display.textContent = '00:00:00.000';
        laps = [];
        renderLaps();
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('lapButton').textContent = 'Lap';
    laps = [];
    renderLaps();
}

// Render laps list
function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        let li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
