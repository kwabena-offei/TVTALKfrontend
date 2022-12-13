import { useState, useEffect } from 'react';

export function useWindowDimensions() {
    const [windowWidth, setWindowWidth] = useState();
  
    useEffect(() => {
      function handleResize() {
          setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, []);
  
    const isMobile = windowWidth < 780;
  
    return {
      windowWidth,
      isMobile
    };
  }
