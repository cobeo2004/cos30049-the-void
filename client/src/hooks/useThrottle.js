import React from "react";

/**
 * @template T
 * @param {T} value The value to be throttled
 * @param {number} limit The interval for throttling
 * @returns {T} The throttled value
 */
export function useThrottle(value, limit) {
  if (typeof limit !== "number") throw new Error("Limit should be a number");
  const [throttled, setThrottled] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottled(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttled;
}
