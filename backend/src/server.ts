import express, { Express } from "express";
import dotenv from "dotenv";
import LoggingMiddleware from "./middlewares/LoggingMiddleware";
import middlewareLoader from "./loaders/middlewareLoader";
import databaseLoader from "./loaders/databaseLoader";
import routingLoader from "./loaders/routingLoader";

//Init application aspects
dotenv.config();
const app: Express = express();

//Order should be in load order
[middlewareLoader, databaseLoader, routingLoader].forEach((loader) =>
  loader(app)
);

//Middleware to handle error related operations middlewares and controllers
app.use(LoggingMiddleware.errorLogger);

//to initialize project in port given in env variables
app.listen(process.env.PORT, () => {
  LoggingMiddleware.logger.info(
    `Application server is running at https://localhost:${process.env.PORT}`
  );
});
