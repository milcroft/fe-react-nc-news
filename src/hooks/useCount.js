import { useState } from 'react';
export const useCount = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((currentCount) => {
      return currentCount + 1;
    });
  };

  const resetCount = () => {
    setCount((currentCount) => {
      return currentCount - 1;
    });
  };
  return { count, increaseCount, resetCount };
};
