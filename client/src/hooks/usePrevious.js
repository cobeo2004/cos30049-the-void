import React from "react";

/**
 * @template T
 * @param {T} value The current value
 * @returns {T | undefined} The previous value
 */
export function usePrevious(value) {
  const refer = React.useRef();
  React.useEffect(() => {
    refer.current = value;
  });
  return refer.current;
}
