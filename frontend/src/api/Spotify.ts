import APIConfig from "../config/APIConfig.json";
import RequestConfig from "../config/RequestConfig.json";

/**
 * Axios config to fetch spotify token from backend
 */
export const spotifyToken = {
  method: "get",
  url: APIConfig.SPOTIFY_TOKEN,
  headers: {},
};

/**
 * Axios config to commit search by requesting Spotify API
 * @param token spotify token
 * @param searchText query to be searched
 * @returns Generated config to handle search to spotify via request
 */
export const spotifySearch = (token: string, searchText: string) => ({
  method: "get",
  url: `${APIConfig.SPOTIFY_SEARCH}${searchText}${APIConfig.SPOTIFY_SEARCH_OPTIONS}`,
  headers: {
    Authorization: `${RequestConfig.SPOTIFY_TOKEN_KEY} ${token}`,
  },
});
