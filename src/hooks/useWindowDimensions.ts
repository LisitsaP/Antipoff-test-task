import { useState, useEffect } from 'react';

const getWindowDimensions = (): number => {
  const { innerWidth: width } = window;
  return width;
};

export default function useWindowDimensions(): number {
  const [windowDimensions, setWindowDimensions] = useState<number>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}