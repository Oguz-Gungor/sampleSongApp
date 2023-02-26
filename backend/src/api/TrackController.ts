import { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
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
    await wrapServiceResponse(
      res,
      TrackService.addTrack(trackInfo, playlistId)
    );
  }, next);

/**
 * Controller to parse track information and user id in request content and call setAnthem service with parsed attributes
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const setAnthem = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const { trackInfo } = req.body;
    const userId = await AuthMiddleware.getUserIDFromToken(req);
    await wrapServiceResponse(res, TrackService.setAnthem(trackInfo, userId));
  }, next);

/**
 * Controller to parse user id in request content and call getAnthem service with parsed attributes
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const getAnthem = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const userId = await AuthMiddleware.getUserIDFromToken(req);
    await wrapServiceResponse(res, TrackService.getAnthem(userId));
  }, next);

/**
 * Controller to parse user id in request content and call getAnthem service with parsed attributes
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const removeTrackFromPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  withErrorHandler(async () => {
    const userId = await AuthMiddleware.getUserIDFromToken(req);
    const trackId = req.query.trackId as string;
    const playlistId = parseInt(req.query.playlistId as string);
    await wrapServiceResponse(
      res,
      TrackService.removeTrackFromPlaylist(trackId, playlistId, userId)
    );
  }, next);

export default {
  getTracks,
  addTrack,
  setAnthem,
  getAnthem,
  removeTrackFromPlaylist,
};
