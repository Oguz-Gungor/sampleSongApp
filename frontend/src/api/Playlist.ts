export const getPlaylistConfig = {
    method: "get",
    url: "/playlists",
    headers: {},
  }

  export const addPlaylistConfig =(playlist:any)=> ({
    method: "post",
    url: "/playlists",
    headers: {},
  })