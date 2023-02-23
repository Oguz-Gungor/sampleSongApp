import { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import PlaylistService from "../service/PlaylistService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

/**
 * Controller to parse user id in request content and call getPlaylists service with parsed attribute
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const getPlaylists = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const userId = await AuthMiddleware.getUserIDFromToken(req);
    await wrapServiceResponse(res, PlaylistService.getPlaylists(userId));
  }, next);

/**
 * Controller to parse user id and playlist data in request content and call addplaylist service with parsed attributes
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const addPlaylist = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const playlistData = req.body;
    const userId = await AuthMiddleware.getUserIDFromToken(req);
    await wrapServiceResponse(
      res,
      PlaylistService.addPlaylist(playlistData, userId)
    );
  }, next);

export default { getPlaylists, addPlaylist };
