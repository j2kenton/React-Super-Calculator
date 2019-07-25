import {
  SET_OUTPUT,
  UPDATE_OUTPUT,
  UPDATE_INPUT,
  SET_OPERATOR,
  TOGGLE_NEGATIVITY,
  APPEND_TO_INPUT
} from 'constants/action-types';
import { calculateUpdatedValue } from 'utils/calculations';
import { isInputValid } from 'utils/tools';

const initialState = {
  output: 0,
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
        input: initialState.input
      };
    }
    case UPDATE_INPUT: {
      if (!isInputValid(action.payload)) {
        return state;
      }
      return {
        ...state,
        input: action.payload
      };
    }
    case APPEND_TO_INPUT: {
      const textToAppend = action.payload;
      const input = `${state.input}${textToAppend}`;
      if (!isInputValid(input)) {
        return state;
      }
      return {
        ...state,
        input
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
