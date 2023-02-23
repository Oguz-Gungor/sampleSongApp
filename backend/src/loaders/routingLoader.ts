import { Express} from "express";
import AuthController from "../api/AuthController";
import PlaylistController from "../api/PlaylistController";
import SpotifyController from "../api/SpotifyController";
import TrackController from "../api/TrackController";
import SpotifyMiddleware from "../middlewares/SpotifyMiddleware";
import dotenv from "dotenv";

dotenv.config();

/**
   * To load routes in startup phase
   * @param app express app
   */
export default function routingLoader(app:Express){

    //playlist loader
    app.get("/playlists", PlaylistController.getPlaylists);
    app.post("/playlists", PlaylistController.addPlaylist);

    //tracks loader
    app.get("/tracks", TrackController.getTracks);
    app.post(
      "/track",
      SpotifyMiddleware.checkSpotifyTrack,
      TrackController.addTrack
    );

    //auth loader
    app.get("/login", AuthController.login);
    app.post("/register", AuthController.register);
    app.get("/validate", AuthController.validate);

    //spotify loader
    app.get("/spotifyToken", SpotifyController.spotifyToken);
}