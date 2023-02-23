import APIConfig from "../config/APIConfig.json";

/**
 * Axios config to fetch playlists from backend
 */
export const getPlaylistConfig = {
    method: "get",
    url: APIConfig.PLAYLISTS,
    headers: {},
  }

  /**
   * Axios config generator to add playlist via request backend
   * @param playlist playlist content to be added
   * @returns generated axios config to handle request for adding playlist in backend
   */
export const addPlaylistConfig =(playlist:any)=> ({
  method: "post",
  url: APIConfig.PLAYLISTS,
  headers: {},  
  data: playlist,
})