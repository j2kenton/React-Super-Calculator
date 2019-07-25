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
import { isInputValid } from 'utils/tools';

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
      const newInput = action.payload;
      const isInputTextValid = isInputValid(newInput);
      const preview = isInputTextValid
        ? calculateUpdatedValue({
            currentValue: state.output,
            valueApplied: newInput,
            operator: state.operator
          })
        : initialState.preview;
      const input = isInputTextValid ? newInput : state.input;
      return {
        ...state,
        preview: `${preview}`,
        input
      };
    }
    case APPEND_TO_INPUT: {
      const textToAppend = action.payload;
      const newInput = `${state.input}${textToAppend}`;
      const isInputTextValid = isInputValid(newInput);
      const preview = isInputTextValid
        ? calculateUpdatedValue({
            currentValue: state.output,
            valueApplied: newInput,
            operator: state.operator
          })
        : initialState.preview;
      const input = isInputTextValid ? newInput : state.input;
      return {
        ...state,
        preview: `${preview}`,
        input
      };
    }
    case INPUT_REMOVE_LAST_CHAR: {
      return {
        ...state,
        input: state.input.slice(0, -1)
      };
    }
    case SET_OPERATOR: {
      return {
        ...state,
        operator: action.payload
      };
    }
    case TOGGLE_NEGATIVITY: {
      return {
        ...state,
        output: state.output * -1
      };
    }
    default:
      return state;
  }
};
