import React, { useState, useEffect } from 'react';

// ref - https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export const useDebounce = (value, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      setDebouncedValue(null);
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
