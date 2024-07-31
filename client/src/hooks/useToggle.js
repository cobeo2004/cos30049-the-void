import React from "react";

/**
 *
 * @param {boolean} initValue The inital value
 * @returns {[boolean, VoidFunction]} A tuple containing the value and a function to toggle the value
 */
export function useToggle(initValue = false) {
  if (typeof initValue !== "boolean")
    throw new Error("Initial value must be a boolean");
  const [val, setVal] = React.useState(initValue);
  const toggle = React.useCallback(() => {
    setVal((v) => !v);
  }, []);

  return [val, toggle];
}
