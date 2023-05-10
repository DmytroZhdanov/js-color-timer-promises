const refs = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let id = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onstopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  id = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }, 1000);
}

function onstopBtnClick() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(id);
}
