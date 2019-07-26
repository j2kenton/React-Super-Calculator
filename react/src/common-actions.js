import {
  SET_OUTPUT,
  UPDATE_OUTPUT,
  UPDATE_INPUT,
  SET_OPERATOR,
  TOGGLE_NEGATIVITY,
  APPEND_TO_INPUT,
  INPUT_REMOVE_LAST_CHAR,
  RESET_FORM,
  UNDO_UPDATE_OUTPUT
} from 'constants/action-types';

export function setOutput(output) {
  return {
    type: SET_OUTPUT,
    payload: output
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

export function toggleOutputNegativity() {
  return {
    type: TOGGLE_NEGATIVITY
  };
}

export function appendToInput(text) {
  return {
    type: APPEND_TO_INPUT,
    payload: text
  };
}

export function inputRemoveLastChar() {
  return {
    type: INPUT_REMOVE_LAST_CHAR
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

export function undoUpdateOutput() {
  return {
    type: UNDO_UPDATE_OUTPUT
  };
}
