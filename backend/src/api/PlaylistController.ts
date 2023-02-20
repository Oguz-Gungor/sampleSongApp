import { NextFunction, Request, Response } from "express";
import PlaylistService from "../service/PlaylistService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

const getPlaylists = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(() => {
    wrapServiceResponse(res, PlaylistService.getPlaylists());
  }, next);

const addPlaylist = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(() => {
    res.send([]);
  }, next);

export default { getPlaylists, addPlaylist };
