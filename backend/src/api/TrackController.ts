import { Request, Response } from "express";
import TrackService from "../service/TrackService";
import { wrapServiceResponse } from "./ControllerUtil";

const getTracks = async (req: Request, res: Response) => {
  const playlistId = parseInt(req.query.id as string);
  wrapServiceResponse(res, TrackService.getTracks(playlistId));
};

const addTrack = async (req: Request, res: Response) => {
  res.send();
};

export default { getTracks, addTrack };
