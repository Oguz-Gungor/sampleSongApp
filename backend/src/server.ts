import express, {
  Express,
  RequestHandler,
} from "express";
import cors from "cors";
import AuthController from "./api/AuthController";
import dotenv from "dotenv";
import TrackController from "./api/TrackController";
import PlaylistController from "./api/PlaylistController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import SpotifyMiddleware from "./middlewares/SpotifyMiddleware";
import LoggingMiddleware from "./middlewares/LoggingMiddleware";

dotenv.config();

const app: Express = express();

app.use(cors());

//middleware loader
interface IExcludedRequest {
  path: string;
  //todo : may be converted to enum
  method: string;
}
const excludePaths =
  (
    requestList: IExcludedRequest[],
    middleware: RequestHandler
  ): RequestHandler =>
  (req, res, next) => {
    if (
      requestList.some(
        ({ path, method }) => path === req.path && method === req.method
      )
    ) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
app.use(LoggingMiddleware.requestLogger);
app.use(
  excludePaths(
    [{ path: "/login", method: "GET" }],
    AuthMiddleware.validateToken
  )
);

//playlist loader
app.get(
  "/playlists",
  PlaylistController.getPlaylists
);
app.post(
  "/playlists",
  PlaylistController.addPlaylist
);

//tracks loader
app.get("/tracks", TrackController.getTracks);
app.post(
  "/track",
  SpotifyMiddleware.checkSpotifyTrack,
  TrackController.addTrack
);

//login loader
app.get("/login", AuthController.login);
app.get("/validate", AuthController.validate);

app.listen(process.env.PORT, () => {
  console.log(
    `[Server]: I am running at https://localhost:${process.env.PORT}`
  );
});
