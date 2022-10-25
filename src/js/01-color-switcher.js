const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStop.disabled = true;

btnStart.addEventListener('click', clickStart);
btnStop.addEventListener('click', clickStop);

function clickStart(evt) {
  evt.target.disabled = true;
  btnStop.removeAttribute('disabled');
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function clickStop(evt) {
  btnStart.removeAttribute('disabled');
  evt.target.disabled = true;
  clearInterval(timerId);
}
