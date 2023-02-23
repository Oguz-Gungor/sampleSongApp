import APIConfig from "../config/APIConfig.json";
import { generateQueryParams } from "../util/UtilFunctions";

/**
 * Axios request generator to get tracks in specified playlist
 * @param props properties to generate axios config, i.e. playlistId 
 * @returns generated axios config to handle request
 */
export const getTracksConfig = ({ playlistId }: any) => ({
    method: "get",
    url: `${APIConfig.TRACKS}${generateQueryParams({ id: playlistId })}`,
    headers: {},
  });
  