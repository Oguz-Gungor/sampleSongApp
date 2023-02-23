import { IRequestInterface } from "../interfaces/RequestInterfaces";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
