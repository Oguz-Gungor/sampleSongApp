import { IRequestInterface } from "../interfaces/RequestInterfaces";
import SpotifyWebApi from "spotify-web-api-node";

//todo: move to .env
let spotifyApi = new SpotifyWebApi({
  clientId: "fa11d05877a84f35ba59458865a6d234",
  clientSecret: "e0baed8da32d43f3816668ee9a0ae620",
});

/**
 * To response fetched spotify client token to frontend
 * @returns spotify token
 */
const requestSpotifyToken = async (): Promise<IRequestInterface<string>> => {
  const { token } = await setSpotifyToken();
  return { status: 200, dto: token };
};

/**
 * To set spotify token to created spotify client manager
 * @returns created token
 */
const setSpotifyToken = async () => {
  //Fetch token from Spotify API
  const result = await spotifyApi.clientCredentialsGrant();
  const token = result.body.access_token;

  //set fetched token to spotify client manager
  await spotifyApi.setAccessToken(token);
  return { token };
};

/**
 * Getter method to use created spotify client manager
 * @returns spotify client manager
 */
const getSpotifyApi = () => spotifyApi;

export default { requestSpotifyToken, getSpotifyApi, setSpotifyToken };
