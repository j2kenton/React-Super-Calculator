import { SET_OUTPUT, UPDATE_OUTPUT } from 'constants/action-types';

export function setOutput(output) {
  return {
    type: SET_OUTPUT,
    payload: {
      output
    }
  };
}

export function updateOutput(operator, valueApplied) {
  return {
    type: UPDATE_OUTPUT,
    payload: {
      operator,
      valueApplied
    }
  };
}
