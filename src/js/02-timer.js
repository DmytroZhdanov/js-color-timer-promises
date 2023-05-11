const refs = {
  body: document.body,
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

let delta;
const DELAY = 1000;

const message =
  '<div class="alert-message is-hidden"> 🚫 Please, choose a date in the future</div>';
refs.body.insertAdjacentHTML('beforeend', message);
const alertContainer = document.querySelector('.alert-message');

refs.input.type = 'datetime-local';
refs.startBtn.disabled = true;

refs.input.addEventListener('blur', onInputBlur);
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  setTimer();
  const id = setInterval(() => {
    setTimer()

    if (delta < DELAY) {
      clearInterval(id);
    }
  }, DELAY);
}

function setTimer() {
  delta = getDeltaTime();

  const days = calculateDates(delta);
  const hours = calculateHours(delta);
  const minutes = calculateMinutes(delta);
  const seconds = calculateSeconds(delta);

  refs.outputDays.textContent = `${days}`;
  refs.outputHours.textContent = `${hours}`;
  refs.outputMinutes.textContent = `${minutes}`;
  refs.outputSeconds.textContent = `${seconds}`;
}

function getDeltaTime() {
  const chosenDatetime = new Date(refs.input.value);
  const currenTime = new Date();
  return chosenDatetime - currenTime;
}

function calculateDates(ms) {
  return pad(Math.floor(ms / 86400000));
}

function calculateHours(ms) {
  return pad(Math.floor((ms % 86400000) / 3600000));
}

function calculateMinutes(ms) {
  return pad(Math.floor((ms % 3600000) / 60000));
}

function calculateSeconds(ms) {
  return pad(Math.floor((ms % 60000) / 1000));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function onInputBlur() {
  const isInFuture = getDeltaTime() > 0;

  if (!isInFuture) {
    refs.startBtn.disabled = !isInFuture;
    alertContainer.classList.remove('is-hidden');

    setTimeout(() => {
      alertContainer.classList.add('is-hidden');
    }, 3000);
  } else {
    refs.startBtn.disabled = !isInFuture;
  }
}
