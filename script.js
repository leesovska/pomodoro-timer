const timerDisplay = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const pomodoroButton = document.querySelector('#pomodoro');
const breakButton = document.querySelector('#break');
const buttons = document.querySelectorAll('.btn');

let intervalId;
let mode;

function startTimer() {
  const time = timerDisplay.textContent.split(':');
  let minutes = parseInt(time[0]);
  let seconds = parseInt(time[1]);

  intervalId = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        stopTimer();
        setTimeout(() => {
          resetTimer();
          startButton.textContent = 'start';
        }, 500);
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

function removeActiveClass() {
  buttons.forEach((button) => {
    button.classList.remove('active');
  });
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

pomodoroButton.addEventListener('click', () => {
  mode = 'pomodoro';
  stopTimer();
  resetTimer();
  startButton.textContent = 'start';

  removeActiveClass();
  pomodoroButton.classList.add('active');
});

breakButton.addEventListener('click', () => {
  mode = 'break';
  stopTimer();
  resetTimer();
  startButton.textContent = 'start';

  removeActiveClass();
  breakButton.classList.add('active');
});