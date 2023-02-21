/**
 * Axios config to fetch spotify token from backend
 */
export const spotifyToken = {
  method: "get",
  url: "/spotifyToken",
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
    url: `https://api.spotify.com/v1/search?q=${searchText}&type=track`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
