import { SET_OUTPUT, UPDATE_OUTPUT, UPDATE_INPUT } from 'constants/action-types';
import { calculateUpdatedValue } from 'utils/calculations';

const initialState = {
  output: '0',
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
      return {
        ...state,
        input: action.payload
      };
    }
    default:
      return state;
  }
};
