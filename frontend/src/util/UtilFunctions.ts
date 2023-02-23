import axios, { AxiosRequestConfig } from "axios";
import RequestConfig from "../config/RequestConfig.json";

/**
 * An util function to wrap axios to add configured host before paths and add authorization resides in session storage
 * @param requestConfig axios config
 * @returns axios call with host adress and auth token added to the config in parameter
 */
export const wrappedAxios = (requestConfig: AxiosRequestConfig) =>
  axios({
    ...requestConfig,
    url: RequestConfig?.API + (requestConfig?.url ?? ""),
    headers: {
      ...requestConfig.headers,
      Authorization: `${RequestConfig.TOKEN_KEY} ${window.sessionStorage.getItem(RequestConfig.TOKEN_KEY)}`,
    },
  });

/**
 * To generate query string for rest request with given params
 * @param params parameters to be added to the query string
 * @returns generated query string
 */
export const generateQueryParams = (params: { [key: string]: any }) =>
  Object.entries(params)
    .reduce((prevValue, [key, value]) => `${prevValue}${key}=${value}&`, "?")
    .slice(0, -1);

/**
 * To remove authentication token
 */
export const removeToken = () => {
  window.sessionStorage.removeItem(RequestConfig.TOKEN_KEY);
};
