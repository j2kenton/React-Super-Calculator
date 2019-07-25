import { SET_OUTPUT, UPDATE_OUTPUT } from 'constants/action-types';
import { calculateUpdatedValue } from 'utils/calculations';

const initialState = {
  output: '0',
  input: ''
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
        output: calculateUpdatedValue({ ...action.payload, currentValue: state.output })
      };
    }
    default:
      return state;
  }
};
