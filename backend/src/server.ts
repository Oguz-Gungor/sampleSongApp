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

//Init application aspects
dotenv.config();
const app: Express = express();

//Middleware to specify allowed request types, content and source
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
//Method to exclude given request struct from middleware
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

//Middleware to log requests
app.use(LoggingMiddleware.requestLogger);

//Middleware to verify user in all requests except given paths and methods
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
  logging: false
});

//Models to be synched with database
const utilInstances = [
  User.util,
  Playlist.util,
  Track.util,
  PlaylistTrack.util,
];

//todo : set transaction for init methods
//To initialize tables and relations in db
const initializeDB = async (t: Transaction) => {
  //Initialize tables
  await Promise.all(
    utilInstances.map(async (utilInstance) => {
      await utilInstance.init(sequelize);
      return utilInstance;
    })
  );
  //Set relations
  await Promise.all(
    utilInstances.map(async (utilInstance) => {
      await utilInstance.setRelations();
      return utilInstance;
    })
  );
  //sync relations with db
  await Promise.all(
    utilInstances.map(async (utilInstance) => {
      await utilInstance.sync();
      return utilInstance;
    })
  );
  //creates initial user
  await User.User.create({name:"oguz",
    email:"asd@asd.asd",
    password:"123"}).catch((err)=>{
      console.log("err on adding default user");
    })
};

//To connect to database on startup, retry on connection error
const tryConn = () => sequelize.transaction(initializeDB).then(()=>{
  console.log("connection established");
}).catch((err)=>{
  //todo: set timeout  
  console.log("db conn refused");
  // console.log("error: " , err);
  const timeout = setTimeout(()=>{
  tryConn();
  clearTimeout(timeout)
  },5000);
});
tryConn();

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

//Middleware to handle error related operations middlewares and controllers
app.use(LoggingMiddleware.errorLogger);

//to initialize project in port given in env variables
app.listen(process.env.PORT, () => {
  console.log(
    `[Server]: I am running at https://localhost:${process.env.PORT}`
  );
});
