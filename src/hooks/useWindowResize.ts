import React, { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const client = typeof window !== 'undefined';
  const [windowSize, setWindowSize] = useState([
    client ? window.innerWidth : 0,
    client ? window.innerHeight : 0
  ]);
  const handleResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    if (client) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (client) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  return windowSize;
};
