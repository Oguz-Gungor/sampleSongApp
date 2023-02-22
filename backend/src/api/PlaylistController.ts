import { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import PlaylistService from "../service/PlaylistService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

const getPlaylists = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const userId = await AuthMiddleware.getUserIDFromToken(req);
    await wrapServiceResponse(res, PlaylistService.getPlaylists(userId));
  }, next);

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
