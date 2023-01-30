import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('input[type="text"]');
const startButton = document.querySelector('button[data-start]');
const datesEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('input[data-hours]');
const minutesEl = document.querySelector('input[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      startButton.disabled = true;
      selectedDates[0] = new Date();
    } else if (selectedDates[0] > new Date()) {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let timerId = null;

function handleStartTimer() {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  timerId = setInterval(() => {
    const timeDifference = new Date(dateTimePicker.value) - new Date();
    if (timeDifference < 0) {
      return;
    }
    const timeObj = convertMs(timeDifference);

    datesEl.textContent = addLeadingZero(timeObj.days);
    hoursEl.textContent = addLeadingZero(timeObj.hours);
    minutesEl.textContent = addLeadingZero(timeObj.minutes);
    secondsEl.textContent = addLeadingZero(timeObj.seconds);
  }, 1000);
}

startButton.addEventListener('click', handleStartTimer);
