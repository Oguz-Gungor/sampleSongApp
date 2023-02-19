import axios, { AxiosRequestConfig } from "axios";
import * as React from "react";
import { wrappedAxios } from "./UtilFunctions";

export function useLocalFetch<T>(
  getRequestConfig: AxiosRequestConfig,
  reFetch = false
): {
  payload: T | null;
  isLoading: boolean;
  error: string | null;
  setPostConfig: React.Dispatch<
    React.SetStateAction<AxiosRequestConfig<any> | null>
  >;
} {
  const [payload, setPayload] = React.useState<T | null>(null);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [postConfig, setPostConfig] = React.useState<AxiosRequestConfig | null>(
    null
  );

  React.useEffect(() => {
    handleRequest(getRequestConfig);
  }, [reFetch]);

  React.useEffect(() => {
    if (postConfig != null) {
      handleRequest(postConfig);
    }
  }, [postConfig]);

  const handleRequest = (specifiedResutConfig: AxiosRequestConfig) => {
    setLoading(true);
    wrappedAxios(specifiedResutConfig)
      .then((response) => {
        setPayload(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { payload, isLoading, error, setPostConfig };
}
