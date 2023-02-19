import { NextFunction, Request, Response } from "express";

const checkSpotifyTrack = (req: Request, res: Response, next: NextFunction) => {
  //todo : check is track content valid by requesting spotify api
  next();
};


export default {checkSpotifyTrack}