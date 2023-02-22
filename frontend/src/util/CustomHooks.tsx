import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
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
 * Custom hook to return and trigger current request status and payload to the react components via react states
 * @param getRequestConfig axios request config
 * @param wrap whether request should be wrapped with wrappedAxios
 * @param reFetch boolean value to trigger new request
 * @returns object that contains response internals, pending status, error message and related post config dispatcher
 */
export function useLocalFetch<T>(
  getRequestConfig: AxiosRequestConfig,
  wrap = true,
  reFetch = false
): ILocalFetchHookResult<T> {
  // latest response payload
  const [payload, setPayload] = React.useState<T | null>(null);
  // current pending status
  const [isLoading, setLoading] = React.useState<boolean>(false);
  //latest error message
  const [error, setError] = React.useState<string | null>(null);

  //fetch hook to handle request cycle with given dispatchers and states
  const { setPostConfig } = useFetch(
    getRequestConfig,
    setLoading,
    setPayload,
    setError,
    wrap,
    reFetch
  );

  //return current status
  return { payload, isLoading, error, setPostConfig };
}

/**
 * Custom hook to return and trigger current request status and payload to the react components via redux states
 * @param getRequestConfig axios request config
 * @param selectorFunction function to fetch desired object from redux
 * @param action redux dispatch action
 * @param wrap whether request should be wrapped with wrappedAxios
 * @param reFetch boolean value to trigger new request
 * @returns current request state of desired object in redux
 */
export function useReduxFetch(
  getRequestConfig: AxiosRequestConfig | null,
  selectorFunction: (state: any) => any,
  action: any,
  wrap = true,
  reFetch = false
) {
  //request state of object resides in redux
  const { payload, isLoading, error } = useSelector(selectorFunction);

  const dispatch = useDispatch();

  //dispatcher to update loading attribute of desired object
  const setLoading = (data: any) =>
    dispatch({ type: RequestReducer.pending(action), payload: data });
  //dispatcher to update payload attribute of desired object
  const setPayload = (data: any) =>
    dispatch({ type: RequestReducer.success(action), payload: data });
  //dispatcher to update error attribute of desired object
  const setError = (data: any) =>
    dispatch({ type: RequestReducer.error(action), payload: data });

  //fetch hook to handle request cycle with given dispatchers and states
  const { setPostConfig } = useFetch(
    getRequestConfig,
    setLoading,
    setPayload,
    setError,
    wrap,
    reFetch
  );

  //return current status
  return { payload, isLoading, error, setPostConfig };
}

/**
 * Custom hook To handle request cycle with given dispatchers and states
 * @param getRequestConfig axios request config
 * @param setLoading dispatcher to update loading status of desired object
 * @param setPayload dispatcher to update payload of desired object
 * @param setError dispatcher to update error status of desired object
 * @param wrap whether request should be wrapped with wrappedAxios
 * @param reFetch boolean value to trigger new request
 * @returns
 */
const useFetch = (
  getRequestConfig: AxiosRequestConfig | null,
  setLoading: any,
  setPayload: any,
  setError: any,
  wrap = true,
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
  const handleRequest = (specifiedResultConfig: AxiosRequestConfig | null) => {
    if (specifiedResultConfig != null) {
      setLoading(true);
      setError(null);
      const requestFunction = wrap ? wrappedAxios : axios;
      requestFunction(specifiedResultConfig)
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
    }
  };
  return { setPostConfig };
};
