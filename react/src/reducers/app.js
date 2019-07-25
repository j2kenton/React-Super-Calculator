import { SET_OUTPUT, UPDATE_OUTPUT, UPDATE_INPUT, SET_OPERATOR } from 'constants/action-types';
import { calculateUpdatedValue } from 'utils/calculations';
import { VALID_INPUT_CHARS_REGEX } from 'constants/numeric';

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
        input: initialState.input,
        operator: initialState.operator
      };
    }
    case UPDATE_INPUT: {
      const userInput = action.payload;
      const dotsInInput = userInput.match(/\./);
      const isTooManyDots = !!dotsInInput && dotsInInput.length > 1;
      const isAllCharsLegal = VALID_INPUT_CHARS_REGEX.test(userInput);
      if (isTooManyDots || !isAllCharsLegal) {
        return state;
      }
      return {
        ...state,
        input: action.payload
      };
    }
    case SET_OPERATOR: {
      return {
        ...state,
        operator: action.payload
      };
    }
    default:
      return state;
  }
};
