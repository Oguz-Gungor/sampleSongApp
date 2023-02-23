import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { removeToken, wrappedAxios } from "./UtilFunctions";
import RequestReducer from "../redux/RequestReducer";
import { validateTokenConfig } from "../api/Auth";
import RequestConfig from "../config/RequestConfig.json";
import RouteConfig from "../config/RouteConfig.json"

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
  getRequestConfig: AxiosRequestConfig | null,
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
            navigate(RouteConfig.LOGIN);
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

/**
 * Possible authorization states
 */
enum LoginStatus {
  CHECKING,
  INITIAL,
  PENDING,
  SUCCESS,
  FAIL,
}

/**
 * Auth containers' authorization status structure
 */
export interface ILoginStateStruct {
  /**
   * authorization status for auth containers
   */
  status: LoginStatus;
}

/**
 * Custom hook to manage authorization cycle
 * @returns dispatcher for login status
 */
export const useAuth = () => {
  //state and dispatcher to contain current authorization status
  const [loginStatus, setLoginStatus] = React.useState<ILoginStateStruct>({
    status: LoginStatus.CHECKING,
  });

  const navigate = useNavigate();

  // If authentication token exists on container load, validate existing token. Else, set current status as INITIAL(Unauthorized)
  React.useEffect(() => {
    if (window.sessionStorage.getItem(RequestConfig.TOKEN_KEY) == null) {
      setLoginStatus({ status: LoginStatus.INITIAL });
    } else {
      validateToken(setLoginStatus);
    }
  }, []);

  // If login status changed to success, opens main container
  React.useEffect(() => {
    if (loginStatus.status === LoginStatus.SUCCESS) {
      navigate(RouteConfig.MAIN);
    }
  }, [loginStatus.status]);

  /**
   * variable to state whether loader should be shown or not
   */
  const showLoader =
    loginStatus.status === LoginStatus.CHECKING ||
    loginStatus.status === LoginStatus.SUCCESS ||
    loginStatus.status === LoginStatus.PENDING;

  return { showLoader, setLoginStatus };
};

/**
 * Commit auth request with given request config and set login status respect to REST response
 * @param data form data
 * @param setLoginStatus login status dispatcher
 */
export const authHandler = (
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>,
  requestConfig: AxiosRequestConfig
) => {
  handleAuthEvents(wrappedAxios(requestConfig), setLoginStatus);
};

/**
 * Commit validation request to validate existing token and set login status respect to validation result
 * @param setLoginStatus login status dispatcher
 */
const validateToken = (
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  handleAuthEvents(wrappedAxios(validateTokenConfig), setLoginStatus);
};

/**
 * To handle authorization related response and set current authorization status accordingly
 * @param request axios request config for request to be comitted
 * @param setLoginStatus login status dispatcher
 */
const handleAuthEvents = (
  request: Promise<any>,
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  request
    .then((response) => {
      switch (response.status) {
        case 200:
          window.sessionStorage.setItem(RequestConfig.TOKEN_KEY, response.data);
          setLoginStatus({ status: LoginStatus.SUCCESS });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
