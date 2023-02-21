import { generateQueryParams } from "../util/UtilFunctions";

/**
 * Axios config generator to handle login operation via request
 * @param data Form data to be used in login request
 * @returns Generated axios config to handle login operation 
 */
export const getLoginConfig = (data: any) => ({
  method: "get",
  url: `/login${generateQueryParams(data)}`,
  headers: {},
});

/**
 * Axios config to validate existing token via requesting backend
 */
export const validateTokenConfig = {
  method: "get",
  url: "/validate",
  headers: {},
};

