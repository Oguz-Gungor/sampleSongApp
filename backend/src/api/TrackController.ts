import { NextFunction, Request, Response } from "express";
import TrackService from "../service/TrackService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

const getTracks = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(() => {
    const playlistId = parseInt(req.query.id as string);
    wrapServiceResponse(res, TrackService.getTracks(playlistId));
  }, next);

const addTrack = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(() => {
    res.send("add track");
  }, next);

export default { getTracks, addTrack };
