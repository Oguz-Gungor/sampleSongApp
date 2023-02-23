import { Express } from "express";
import AuthController from "../api/AuthController";
import PlaylistController from "../api/PlaylistController";
import SpotifyController from "../api/SpotifyController";
import TrackController from "../api/TrackController";
import SpotifyMiddleware from "../middlewares/SpotifyMiddleware";
import APIConfig from "../config/APIConfig.json";
import dotenv from "dotenv";

dotenv.config();

export enum Requests {
  GET = "GET",
  POST = "POST",
}
/**
 * To load routes in startup phase
 * @param app express app
 */
export default function routingLoader(app: Express) {
  //playlist loader
  app.get(APIConfig.PLAYLISTS, PlaylistController.getPlaylists);
  app.post(APIConfig.PLAYLISTS, PlaylistController.addPlaylist);

  //tracks loader
  app.get(APIConfig.TRACKS, TrackController.getTracks);
  app.post(
    APIConfig.TRACKS,
    SpotifyMiddleware.checkSpotifyTrack,
    TrackController.addTrack
  );

  //auth loader
  app.get(APIConfig.LOGIN, AuthController.login);
  app.post(APIConfig.REGISTER, AuthController.register);
  app.get(APIConfig.VALIDATE, AuthController.validate);

  //spotify loader
  app.get(APIConfig.SPOTIFY_TOKEN, SpotifyController.spotifyToken);
}
