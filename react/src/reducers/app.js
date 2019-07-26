import {
  SET_OUTPUT,
  UPDATE_OUTPUT,
  UPDATE_INPUT,
  SET_OPERATOR,
  TOGGLE_NEGATIVITY,
  APPEND_TO_INPUT,
  INPUT_REMOVE_LAST_CHAR
} from 'constants/action-types';
import { calculateUpdatedValue } from 'utils/calculations';
import { isInputValid, getUpdatedTempValues } from 'utils/tools';

const initialState = {
  output: 0,
  preview: '',
  input: '',
  operator: 'add'
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_OUTPUT: {
      return {
        ...state,
        output: action.payload.output
      };
    }
    case UPDATE_OUTPUT: {
      return {
        ...state,
        output: calculateUpdatedValue({
          currentValue: state.output,
          valueApplied: state.input,
          operator: state.operator
        }),
        input: initialState.input,
        preview: initialState.preview
      };
    }
    case UPDATE_INPUT: {
      const newValues = getUpdatedTempValues(state, action.payload, initialState.preview);
      return {
        ...state,
        ...newValues
      };
    }
    case APPEND_TO_INPUT: {
      const textToAppend = action.payload;
      const newInput = `${state.input}${textToAppend}`;
      const newValues = getUpdatedTempValues(state, newInput, initialState.preview);
      return {
        ...state,
        ...newValues
      };
    }
    case INPUT_REMOVE_LAST_CHAR: {
      const newValues = getUpdatedTempValues(state, state.input.slice(0, -1), initialState.preview);
      return {
        ...state,
        ...newValues
      };
    }
    case SET_OPERATOR: {
      const newState = {
        ...state,
        operator: action.payload
      };
      const newValues = getUpdatedTempValues(newState, state.input, initialState.preview);
      return { ...newState, ...newValues };
    }
    case TOGGLE_NEGATIVITY: {
      const newState = {
        ...state,
        output: state.output * -1
      };
      const newValues = getUpdatedTempValues(newState, state.input, initialState.preview);
      return { ...newState, ...newValues };
    }
    default:
      return state;
  }
};
