import { generateQueryParams } from "../util/UtilFunctions";
import APIConfig from "../config/APIConfig.json";

/**
 * Axios config generator to handle login operation via request
 * @param data Form data to be used in login request
 * @returns Generated axios config to handle login operation
 */
export const getLoginConfig = (data: any) => ({
  method: "get",
  url: `${APIConfig.LOGIN}${generateQueryParams(data)}`,
  headers: {},
});

/**
 * Axios config to validate existing token via requesting backend
 */
export const validateTokenConfig = {
  method: "get",
  url: APIConfig.VALIDATE,
  headers: {},
};

export const getRegisterConfig = (data: any) => ({
  method: "post",
  url: APIConfig.REGISTER,
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
});
