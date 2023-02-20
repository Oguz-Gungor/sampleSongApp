export const spotifyToken = {
  method: "get",
  url: "/spotifyToken",
  headers: {},
};

export const spotifySearch = (token: string, searchText: string) => ({
    method: "get",
    url: `https://api.spotify.com/v1/search?q=${searchText}&type=track`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
