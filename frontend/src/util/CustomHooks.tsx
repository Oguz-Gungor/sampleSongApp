import axios, { AxiosRequestConfig } from "axios";
import * as React from "react";

export function useFetch<T>(
  requestConfig: AxiosRequestConfig,
  reFetch = false
): {
  payload: T | null;
  isLoading: boolean;
  error: string | null;
} {
  const [payload, setPayload] = React.useState<T | null>(null);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    axios(requestConfig)
      .then((response) => {
        setPayload(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reFetch]);

  return { payload, isLoading, error };
}
