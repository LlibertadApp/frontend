import { useState, useEffect } from 'react';

const useResultsEnabled = () => {
  const [isResultsEnabled, setIsResultsEnabled] = useState(false);
  const resultsDate = new Date('2023-11-19T21:00:00-03:00');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now >= resultsDate && !isResultsEnabled) {
        setIsResultsEnabled(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clears the interval on unmount
  }, []);

  return isResultsEnabled;
};

export default useResultsEnabled;
