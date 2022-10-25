import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

import '../css/timer.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const startTime = Date.now();
    const calendarTime = new Date(selectedDates[0]);

    if (calendarTime < startTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
    } else {
      btnStartEl.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const btnStartEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
// const blockCalendarEl = document.querySelector('div.flatpickr-calendar ');
btnStartEl.disabled = true;

clearCalendar();

function clearCalendar() {
  inputEl.value = '';
}

class Timer {
  constructor({ onTick }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const selectedTime = new Date(inputEl.value).getTime();
    this.isActive = true;

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      // console.log(deltaTime);

      if (deltaTime < 0) {
        // console.log(deltaTime);
        clearInterval(this.timerId);
        // return;
      } else {
        const time = this.convertMs(deltaTime);

        this.onTick(time);
      }

      // console.log(time);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const newTimer = new Timer({ onTick: changeValueTimer });

btnStartEl.addEventListener('click', () => {
  newTimer.start();
});

function changeValueTimer(obj) {
  daysEl.textContent = obj.days;
  hoursEl.textContent = obj.hours;
  minutesEl.textContent = obj.minutes;
  secondsEl.textContent = obj.seconds;
}
