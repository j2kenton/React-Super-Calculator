import { SET_OUTPUT, UPDATE_OUTPUT, UPDATE_INPUT, SET_OPERATOR } from 'constants/action-types';

export function setOutput(output) {
  return {
    type: SET_OUTPUT,
    payload: {
      output
    }
  };
}

export function updateOutput() {
  return {
    type: UPDATE_OUTPUT
  };
}

export function updateInput(valueApplied) {
  return {
    type: UPDATE_INPUT,
    payload: valueApplied
  };
}

export function setOperator(operator) {
  return {
    type: SET_OPERATOR,
    payload: operator
  };
}
