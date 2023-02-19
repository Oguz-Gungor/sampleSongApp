import axios, { AxiosRequestConfig } from "axios";
import { env } from "./tempConfig";

export const wrappedAxios = (requestConfig: AxiosRequestConfig) =>
  axios({ ...requestConfig, url: env?.API + (requestConfig?.url ?? "") });

export const generateQueryParams = (params: { [key: string]: any }) =>
  Object.entries(params)
    .reduce((prevValue, [key, value]) => `${prevValue}${key}=${value}&`, "?")
    .slice(0, -1);
