import { NextFunction, Request, Response } from "express";
import TrackService from "../service/TrackService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

const getTracks = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const playlistId = parseInt(req.query.id as string);
    await wrapServiceResponse(res, TrackService.getTracks(playlistId));
  }, next);

const addTrack = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    await wrapServiceResponse(res, TrackService.addTrack(req.body));
  }, next);

export default { getTracks, addTrack };
