import axios, { AxiosRequestConfig } from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken, wrappedAxios } from "./UtilFunctions";

/**
 * Returned structure of useLocalFetch hook 
 */
interface ILocalFetchHookResult<T> {
  /**
   * response payload
   */
  payload: T | null;
  /**
   * whether request is in pending status
   */
  isLoading: boolean;
  /**
   * error message(if any)
   */
  error: string | null;
  /**
   * post message config dispatcher to use corresponding post request with same payload
   */
  setPostConfig: React.Dispatch<
    React.SetStateAction<AxiosRequestConfig<any> | null>
  >;
}

/**
 * Custom hook to return and trigger current request status and payload to the react components
 * @param getRequestConfig axios request config
 * @param reFetch boolean value to trigger new request
 * @returns object that contains response internals, pending status, error message and related post config dispatcher
 */
export function useLocalFetch<T>(
  getRequestConfig: AxiosRequestConfig,
  reFetch = false
): ILocalFetchHookResult<T> {
  const navigate = useNavigate();
  // latest response payload
  const [payload, setPayload] = React.useState<T | null>(null);
  // current pending status
  const [isLoading, setLoading] = React.useState<boolean>(false);
  //latest error message
  const [error, setError] = React.useState<string | null>(null);
  // latest axios post config to trigger hook to use post request and update attributes respect to request cycle 
  const [postConfig, setPostConfig] = React.useState<AxiosRequestConfig | null>(
    null
  );

  // To trigger fetch with optional parameter
  React.useEffect(() => {
    handleRequest(getRequestConfig);
  }, [reFetch]);

  // To update cycle internals with dispatched post config
  React.useEffect(() => {
    if (postConfig != null) {
      handleRequest(postConfig);
    }
  }, [postConfig]);

  /**
   * To handle request and update hook internals respect to request cycle states
   * @param specifiedResutConfig 
   */
  const handleRequest = (specifiedResutConfig: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    wrappedAxios(specifiedResutConfig)
      .then((response) => {
        setPayload(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          removeToken();
          navigate("/login");
        }
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { payload, isLoading, error, setPostConfig };
}
