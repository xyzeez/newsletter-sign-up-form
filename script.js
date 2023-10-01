// Elements
const form = document.querySelector('#form');
const emailInput = document.querySelector('#email');
const emailErrorMessage = document.querySelector('#emailErrorMessage');
const submitBtn = document.querySelector('#submitBtn');
const clearBtn = document.querySelector('#clearBtn');
const mainSection = document.querySelector('.section__main');
const successSection = document.querySelector('.section__success-state');
const emailValue = document.querySelector('#emailValue');
const hiddenFrame = document.querySelector('#hiddenFrame');

// Variables
let isValidEmail;
let successStateLive = false;
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Functions
const showErrorMessage = () => {
  emailInput.setAttribute('aria-invalid', true);
  emailErrorMessage.classList.remove('form__error-message_hide');
};

const hideErrorMessage = () => {
  emailInput.removeAttribute('aria-invalid');
  emailErrorMessage.classList.add('form__error-message_hide');
};

const validateEmail = () => {
  const userEmail = emailInput.value;
  emailPattern.test(userEmail) ? hideErrorMessage() : showErrorMessage();
  isValidEmail = emailPattern.test(userEmail);
};

const submitForm = () => {
  const formData = new FormData(form);
  emailValue.textContent = emailInput.value;
  form.target = 'hiddenFrame';
  form.submit();
  console.log(hiddenFrame);
  form.target = '';
  flipSection();
};

const showSuccessSection = () => {
  mainSection.classList.add('section_hide');
  successSection.classList.remove('section_hide');
  successSection.classList.add('section_reveal');
  successSection.addEventListener(
    'animationend',
    () => {
      successSection.classList.remove('section_reveal');
    },
    { once: true }
  );
  successStateLive = true;
};

const showMainSection = () => {
  successSection.classList.add('section_hide');
  mainSection.classList.remove('section_hide');
  mainSection.classList.add('section_reveal');
  mainSection.addEventListener(
    'animationend',
    () => {
      mainSection.classList.remove('section_reveal');
    },
    { once: true }
  );
  successStateLive = false;
};

const flipSection = () => {
  successStateLive ? showMainSection() : showSuccessSection();
};

// Events
emailInput.addEventListener('blur', validateEmail);

emailInput.addEventListener('input', hideErrorMessage);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateEmail();

  if (isValidEmail) submitForm();
});

clearBtn.addEventListener('click', flipSection);
