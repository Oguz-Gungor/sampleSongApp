import { generateQueryParams } from "../util/UtilFunctions";

export const getLoginConfig = (data: any) => ({
  method: "get",
  url: `/login${generateQueryParams(data)}`,
  headers: {},
});

export const validateTokenConfig = {
  method: "get",
  url: "/validate",
  headers: {},
};

