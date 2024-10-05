import React from "react";

/**
 * @typedef {Object} TScreenSize
 * @property {number} width
 * @property {number} height
 */
/**
 * The hook to get the screen size
 * @returns {TScreenSize} The screen size
 */
export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
}
