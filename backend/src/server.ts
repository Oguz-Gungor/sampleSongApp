import express, { Express, RequestHandler } from "express";
import cors from "cors";
import AuthController from "./api/AuthController";
import dotenv from "dotenv";
import TrackController from "./api/TrackController";
import PlaylistController from "./api/PlaylistController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import SpotifyMiddleware from "./middlewares/SpotifyMiddleware";
import LoggingMiddleware from "./middlewares/LoggingMiddleware";
import SpotifyController from "./api/SpotifyController";
import BodyParser from "body-parser";
import { Sequelize, Transaction } from "sequelize";
import User from "./model/User";
import Playlist from "./model/Playlist";
import Track from "./model/Track";
import PlaylistTrack from "./model/PlaylistTrack";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(BodyParser.raw());

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
    [
      { path: "/login", method: "GET" },
      { path: "/register", method: "POST" },
    ],
    AuthMiddleware.validateToken
  )
);

//db loader
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? ""),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  // hooks: {
  //   afterConnect: () => {
  //     console.log("connection established");
  //   },
  // },
});

const utilInstances = [
  User.util,
  Playlist.util,
  Track.util,
  PlaylistTrack.util,
];
//todo : set transaction for init methods
const initializeDB = async (t: Transaction) => {
  await Promise.all(
    utilInstances.map(async (utilInstance) => {
      await utilInstance.init(sequelize);
      return utilInstance;
    })
  );
  await Promise.all(
    utilInstances.map(async (utilInstance) => {
      await utilInstance.setRelations();
      return utilInstance;
    })
  );
  await Promise.all(
    utilInstances.map(async (utilInstance) => {
      await utilInstance.sync();
      return utilInstance;
    })
  );
};
sequelize.transaction(initializeDB);

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

app.use(LoggingMiddleware.errorLogger);

app.listen(process.env.PORT, () => {
  console.log(
    `[Server]: I am running at https://localhost:${process.env.PORT}`
  );
});
