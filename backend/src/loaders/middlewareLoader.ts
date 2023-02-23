import BodyParser from "body-parser";
import { Express, RequestHandler } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

/**
   * To load middlewares in startup phase
   * @param app express app
   */
export default function middlewareLoader(app: Express){

    //Middleware to specify allowed request types, content and source
    app.use(cors());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use(BodyParser.json());
    app.use(BodyParser.raw());

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
}