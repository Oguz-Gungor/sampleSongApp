import axios, { AxiosRequestConfig } from "axios";
import { env } from "./tempConfig";

export const wrappedAxios = (requestConfig: AxiosRequestConfig) =>
  axios({ ...requestConfig, url: env?.API + (requestConfig?.url ?? "") });
