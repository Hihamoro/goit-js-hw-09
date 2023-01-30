function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = null;
stopButton.disabled = true;

startButton.addEventListener('click', () => {
  stopButton.disabled = false;
  startButton.disabled = true;

  timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
});

stopButtonEl.addEventListener('click', () => {
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  clearInterval(timerId);
});
