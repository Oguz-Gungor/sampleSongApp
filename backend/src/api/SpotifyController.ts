import { NextFunction, Request, Response } from "express";
import SpotifyService from "../service/SpotifyService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

/**
 * Controller to redirect get spotify token request to reqest spotify token service
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const spotifyToken = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    await wrapServiceResponse(
      res,
      SpotifyService.requestSpotifyToken()
    );
  }, next);

export default { spotifyToken };
