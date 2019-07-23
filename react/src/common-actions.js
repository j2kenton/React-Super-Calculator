import { SET_OUTPUT } from 'constants/action-types';

export function setOutput(output) {
  return {
    type: SET_OUTPUT,
    payload: {
      output
    }
  };
}
