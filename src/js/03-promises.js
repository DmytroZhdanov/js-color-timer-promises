import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSbmt);

function onFormSbmt(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  if (+delay.value < 0 || +step.value < 0 || +amount.value < 0) {
    Notify.failure('Please, enter only positive values')
    return
  }

  for (let i = 0; i < +amount.value; i += 1) {
    const countedDelay = +delay.value + +step.value * i;

    createPromise(i, countedDelay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
