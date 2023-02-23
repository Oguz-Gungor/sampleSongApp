import { NextFunction, Request, Response } from "express";
import TrackService from "../service/TrackService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

/**
 * Controller to parse playlist in request content and call getTracks service with parsed attribute
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const getTracks = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const playlistId = parseInt(req.query.id as string);
    await wrapServiceResponse(res, TrackService.getTracks(playlistId));
  }, next);

/**
 * Controller to parse track information and playlist id in request content and call addTrack service with parsed attributes
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const addTrack = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const { trackInfo, playlistId } = req.body;
    await wrapServiceResponse(res, TrackService.addTrack(trackInfo,playlistId));
  }, next);

export default { getTracks, addTrack };
