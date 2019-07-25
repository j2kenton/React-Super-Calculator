import * as maths from './mathematics';

export const calculateUpdatedValue = ({ currentValue, valueApplied, operator }) => {
  const functionUsed = maths[operator];
  return functionUsed ? functionUsed(currentValue, valueApplied) : null;
};
