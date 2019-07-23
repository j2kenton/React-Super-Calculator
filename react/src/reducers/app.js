import { SET_OUTPUT } from 'constants/action-types';

const initialState = {
  output: '0'
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_OUTPUT: {
      return {
        ...state,
        output: action.payload.output
      };
    }
    default:
      return state;
  }
};
