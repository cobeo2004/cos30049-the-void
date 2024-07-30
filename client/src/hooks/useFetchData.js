import React from "react";
import axios from "axios";

/**
 *
 * @param {string} url The URL to fetch data from
 * @returns {{data: import("axios").AxiosResponse<any, any> | null, error: unknown | null, loading: boolean}} An object containing the data, error, and loading state
 * @returns
 */
export const useFetchData = (url) => {
  if (typeof url !== "string") throw new Error("URL must be a string");

  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status !== 200) {
          setError(response.statusText);
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
};
