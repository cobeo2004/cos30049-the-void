import React from "react";

/**
 * @template T
 * The hook that is used for debouncing, which is used for delaying the value at a certain interval
 * @see https://www.freecodecamp.org/news/deboucing-in-react-autocomplete-example/#:~:text=Debouncing%20is%20a%20strategy%20used,a%20certain%20period%20of%20time. For more information regarding debouncing technique.
 * @param {T} value The value to be debounced
 * @param {number} delay The interval for debouncing
 * @returns {T} The debounced value
 */

export function useDebounce(value, delay) {
  if (typeof delay !== "number") throw new Error("Delay should be a number");
  const [debounceValue, setDebounceValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
}
