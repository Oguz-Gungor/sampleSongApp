/**
 * Axios config to fetch playlists from backend
 */
export const getPlaylistConfig = {
    method: "get",
    url: "/playlists",
    headers: {},
  }

  /**
   * Axios config generator to add playlist via request backend
   * @param playlist playlist content to be added
   * @returns generated axios config to handle request for adding playlist in backend
   */
export const addPlaylistConfig =(playlist:any)=> ({
  method: "post",
  url: "/playlists",
  headers: {},
})