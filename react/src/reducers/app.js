import {
  SET_OUTPUT,
  UPDATE_OUTPUT,
  UPDATE_INPUT,
  SET_OPERATOR,
  TOGGLE_NEGATIVITY,
  APPEND_TO_INPUT,
  INPUT_REMOVE_LAST_CHAR,
  RESET_FORM,
  UNDO_UPDATE_OUTPUT,
  SET_OUTPUT_AND_OPERATOR
} from 'constants/action-types';
import { calculateUpdatedValue } from 'utils/calculations';
import { getUpdatedTempValues } from 'utils/tools';

const initialState = {
  output: 0,
  previousOutputs: [],
  preview: 'preview...',
  input: '',
  operator: 'add'
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_OUTPUT: {
      return {
        ...state,
        output: action.payload,
        previousOutputs: [...state.previousOutputs, state.output]
      };
    }
    case UPDATE_OUTPUT: {
      const newOutput = calculateUpdatedValue({
        currentValue: state.output,
        valueApplied: state.input,
        operator: state.operator
      });
      return {
        ...state,
        output: newOutput,
        previousOutputs: [...state.previousOutputs, state.output],
        input: initialState.input,
        preview: initialState.preview
      };
    }
    case SET_OUTPUT_AND_OPERATOR: {
      return {
        ...state,
        operator: action.payload,
        output: state.input,
        previousOutputs: [...state.previousOutputs, state.output],
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
        output: state.output * -1,
        previousOutputs: [...state.previousOutputs, state.output]
      };
      const newValues = getUpdatedTempValues(newState, state.input, initialState.preview);
      return { ...newState, ...newValues };
    }
    case RESET_FORM: {
      return { ...initialState };
    }
    case UNDO_UPDATE_OUTPUT: {
      const { previousOutputs } = state;
      if (previousOutputs.length === 0) {
        return state;
      }
      const lastOutput = previousOutputs.pop();
      return {
        ...state,
        output: lastOutput,
        previousOutputs
      };
    }
    default:
      return state;
  }
};
