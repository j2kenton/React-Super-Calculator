import { VALID_INPUT_CHARS_REGEX } from 'constants/numeric';

export const restoreLastFocus = lastBlured => {
  const lastFocusedEl = document.getElementById(lastBlured);
  if (lastFocusedEl) {
    lastFocusedEl.focus();
  }
};

export const isInputValid = inputString => {
  const dotsInInput = inputString.match(/\./);
  const isTooManyDots = !!dotsInInput && dotsInInput.length > 1;
  const isAllCharsLegal = VALID_INPUT_CHARS_REGEX.test(inputString);
  return isAllCharsLegal && !isTooManyDots;
};
