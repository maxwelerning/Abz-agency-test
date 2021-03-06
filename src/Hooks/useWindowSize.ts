import { useState, useEffect } from 'react';

function useWindowSize(): { height: number | undefined; width: number } {
  const isClient = typeof window === 'object';

  function getSize(): { height: number | undefined; width: number } {
    return {
      width: isClient ? window.innerWidth : 1,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize(): void {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return (): void => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;