import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { removeToken, wrappedAxios } from "./UtilFunctions";
import RequestReducer from "../redux/RequestReducer";

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
  // latest response payload
  const [payload, setPayload] = React.useState<T | null>(null);
  // current pending status
  const [isLoading, setLoading] = React.useState<boolean>(false);
  //latest error message
  const [error, setError] = React.useState<string | null>(null);

  const { setPostConfig } = useFetch(
    getRequestConfig,
    setLoading,
    setPayload,
    setError,
    reFetch
  );

  return { payload, isLoading, error, setPostConfig };
}

export function useReduxFetch(
  getRequestConfig: AxiosRequestConfig,
  selectorFunction: (state: any) => any,
  action: any,
  reFetch = false
) {
  const temp = useSelector(selectorFunction);
  console.log(temp);
  const { payload, isLoading, error } = temp;
  const dispatch = useDispatch();
  const setLoading = (data: any) =>
    dispatch({ type: RequestReducer.pending(action), payload: data });
  const setPayload = (data: any) =>
    dispatch({ type: RequestReducer.success(action), payload: data });
  const setError = (data: any) =>
    dispatch({ type: RequestReducer.error(action), payload: data });

  const { setPostConfig } = useFetch(
    getRequestConfig,
    setLoading,
    setPayload,
    setError,
    reFetch
  );

  return { payload, isLoading, error, setPostConfig };
}

const useFetch = (
  getRequestConfig: AxiosRequestConfig,
  setLoading: any,
  setPayload: any,
  setError: any,
  reFetch = false
) => {
  const navigate = useNavigate();
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
  return { setPostConfig };
};
