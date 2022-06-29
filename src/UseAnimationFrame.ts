import { useCallback, useEffect, useRef } from 'react';

const useAnimationFrame = (
  callback: (delta: number | undefined) => boolean,
) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = Math.min(time - previousTimeRef.current, 100) / 1000;
        if (callback(deltaTime) === false) {
          return;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current || 0);
  }, [animate]); // Make sure the effect runs only once
};

export default useAnimationFrame;
