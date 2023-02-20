import { IRequestInterface } from "../interfaces/RequestInterfaces";
import SpotifyWebApi from "spotify-web-api-node";

let spotifyApi = new SpotifyWebApi({
  clientId: "fa11d05877a84f35ba59458865a6d234",
  clientSecret: "e0baed8da32d43f3816668ee9a0ae620",
});

const requestSpotifyToken = async (
): Promise<IRequestInterface<string>> => {
  const result = await spotifyApi.clientCredentialsGrant();
  const token = result.body.access_token;
  await spotifyApi.setAccessToken(token)
  return { status: 200, dto: token };
};

const getSpotifyApi = ()=> spotifyApi;


export default { requestSpotifyToken ,getSpotifyApi};
