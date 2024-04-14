const timerDisplay = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const modeButton = document.querySelector('#pomodoro');

let intervalId;
let mode = 'pomodoro';

function startTimer() {
  let time = timerDisplay.textContent.split(':');
  let minutes = parseInt(time[0]);
  let seconds = parseInt(time[1]);

  intervalId = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        stopTimer();
        timerDisplay.textContent = '25:00';
        startButton.textContent = 'start';
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    let formattedMinutes;
    if (minutes < 10) {
      formattedMinutes = '0' + minutes;
    } else {
      formattedMinutes = '' + minutes;
    }
  
    let formattedSeconds;
    if (seconds < 10) {
      formattedSeconds = '0' + seconds;
    } else {
      formattedSeconds = '' + seconds;
    }
  
    timerDisplay.textContent = formattedMinutes + ':' + formattedSeconds;
  }, 0.5);
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  if (mode === 'pomodoro') {
    timerDisplay.textContent = '25:00';
  } else {
    timerDisplay.textContent = '05:00';
  }
}

startButton.addEventListener('click', () => {
  if (startButton.textContent === 'start') {
    startTimer();
    startButton.textContent = 'stop';
  } else {
    stopTimer();
    startButton.textContent = 'start';
  }
});

resetButton.addEventListener('click', () => {
  stopTimer();
  resetTimer();
  startButton.textContent = 'start';
});

modeButton.addEventListener('click', () => {
  mode = mode === 'pomodoro' ? 'break' : 'pomodoro';
  stopTimer();
  resetTimer();
  startButton.textContent = 'start';
});