export function errorMessageTemplate(content) {
  return `<div id="error" data-testid="error" class="text-center error alert mx-75 mt-30">${content}</div>`
}

export const errorMessages = {
  required: 'Invalid Input!'
}

export function isNumber(value){
  return typeof value === 'number' || Number.isNaN(Number(value));
}

export function startsWithLetter(value) {
  return /[a-z]/i.test(value);
}

import { errorMessages } from "./errorMessages";
import { startsWithLetter } from "./startsWithLetter";

const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi;
const charactersRanges = {
  beforeAt: {
    min: 2,
    max: 10,
  },
  afterAt: {
    min: 2,
    max: 20
  }
}

export function validateEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return errorMessages.required;
  }

  if (!regexEmail.test(email)) {
    return errorMessages.required;
  }

  const [beginning, domain] = email.split('@')

  if (!startsWithLetter(beginning.charAt(0))) {
    return errorMessages.required;
  }
  if (beginning.length < charactersRanges.beforeAt.min || beginning.length > charactersRanges.beforeAt.max) {
    return errorMessages.required;
  }
  const [beforeDot, afterDot] = domain.split('.');

  if (beforeDot.length < charactersRanges.afterAt.min || beforeDot.length > charactersRanges.afterAt.max) {
    return errorMessages.required;
  }
  if (afterDot.length < charactersRanges.afterAt.min || afterDot.length > charactersRanges.afterAt.max) {
    return errorMessages.required;
  }

  return '';
}

import { errorMessages } from "./errorMessages";
import { isNumber } from "./isNumber";

const MAX_DIGITS_ALLOWED = 10;

export function validateMobile(mobile) {
  if (typeof mobile !== 'number') {
    return errorMessages.required;
  }
  if (!isNumber(mobile)) {
    return errorMessages.required;
  }
  if (String(mobile).length > MAX_DIGITS_ALLOWED) {
    return errorMessages.required;
  }

  return '';
}

import { errorMessages } from './errorMessages';

const regexOnlyAlphabetsAndSpaces = /^[a-zA-Z\s]*$/;
const MAX_NAME_CHARACTERS_ALLOWED = 20;

export function validateName(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    return errorMessages.required;
  }

  if (!regexOnlyAlphabetsAndSpaces.test(name)) {
    return errorMessages.required;
  }

  if (name.length > MAX_NAME_CHARACTERS_ALLOWED) {
    return errorMessages.required;
  }

  return '';
}

import { validateName } from './validations/validateName'
import { validateMobile } from './validations/validateMobile';
import { validateEmail } from './validations/validateEmail';

export function validateForm({ name, mobile, email }) {
  const errors = {
    name: validateName(name),
    mobile: validateMobile(mobile),
    email: validateEmail(email)
  };

  return errors;
}

import { validateForm } from './validateForm'

const form = document.getElementById('phone-directory-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const values = {
    name: e.target[0].value,
    mobile: e.target[1].value,
    email: e.target[2].value,
  };

  const errors = validateForm(values);

  console.log({errors});
});

