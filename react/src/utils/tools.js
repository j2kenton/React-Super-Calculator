import { VALID_INPUT_CHARS_REGEX, USABLE_INPUT_REGEX } from 'constants/numeric';
import { calculateUpdatedValue } from 'utils/calculations';

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

export const isInputUsable = inputString => USABLE_INPUT_REGEX.test(inputString);

export const getUpdatedTempValues = ({ input, output, operator }, newInput, defaultPreview) => {
  const isInputTextValid = isInputValid(newInput);
  const inputApplied = isInputTextValid ? newInput : input;
  const isAppliedInputUsable = isInputUsable(inputApplied);
  const preview = isAppliedInputUsable
    ? calculateUpdatedValue({
        currentValue: output,
        valueApplied: inputApplied,
        operator
      })
    : defaultPreview;
  return {
    preview: `${preview}`,
    input: inputApplied
  };
};
