import { NextFunction, Request, Response } from "express";
import { withErrorHandler } from "../api/ControllerUtil";
import SpotifyService from "../service/SpotifyService";

const checkSpotifyTrack = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) =>
  withErrorHandler(async () => {
    const spotifyApi = await SpotifyService.getSpotifyApi();
    try {
      const item: any = await spotifyApi.getTrack(req.body.id);
      const track = {
        track: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        link: item?.external_urls?.spotify,
        image: item?.album?.images[0].url,
        id: item?.id,
      };
      if (compareTracks(track, req.body)) {
        next();
      } else {
        //todo : error
      }
    } catch (err) {
      SpotifyService.setSpotifyToken();
      checkSpotifyTrack(err, req, res, next);
    }
  }, next);

const compareTracks = (track1: any, track2: any) => {
  return Object.entries(track1).every(([key, value]) => track2[key] === value);
};

export default { checkSpotifyTrack };
