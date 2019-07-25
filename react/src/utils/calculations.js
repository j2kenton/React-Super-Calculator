import { OPERATORS } from 'constants/numeric';
import * as maths from './mathematics';

export const calculateUpdatedValue = ({ currentValue, valueApplied, operator }) => {
  const operatorUsed = OPERATORS[operator];
  if (!operatorUsed || !operatorUsed.functionName) return null;
  const functionUsed = maths[operatorUsed.functionName];
  if (!functionUsed) return null;
  return functionUsed(currentValue, valueApplied);
};
