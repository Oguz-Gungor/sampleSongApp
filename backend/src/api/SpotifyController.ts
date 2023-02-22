import { NextFunction, Request, Response } from "express";
import SpotifyService from "../service/SpotifyService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

const spotifyToken = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    await wrapServiceResponse(
      res,
      SpotifyService.requestSpotifyToken()
    );
  }, next);

export default { spotifyToken };
