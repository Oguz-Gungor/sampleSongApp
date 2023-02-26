import { NextFunction, Request, Response } from "express";
import { InferAttributes } from "sequelize";
import { withErrorHandler } from "../api/ControllerUtil";
import { Entries } from "../interfaces/UtilInterfaces";
import Track, { ITrackAttributes }  from "../model/Track";
import SpotifyService from "../service/SpotifyService";

/**
 * To check track information inside request is a valid track in spotify system
 * @param err error stack from earlier handlers
 * @param req REST request
 * @param res REST response
 * @param next next handler for request path
 */
const checkSpotifyTrack = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) =>
  withErrorHandler(async () => {
    const spotifyApi = await SpotifyService.getSpotifyApi();
    try {
      const item: SpotifyApi.SingleTrackResponse = await (await spotifyApi.getTrack(req.body.id)).body;
      const track : ITrackAttributes = {
        track: item?.name,
        artist: item?.artists[0].name,
        album: item?.album.name,
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

/**
 * To compare to track attributes
 * @param track1 
 * @param track2 
 * @returns whether tracks are same
 */
const compareTracks = (track1: ITrackAttributes, track2: ITrackAttributes) => (Object.entries(track1) as Entries<ITrackAttributes>).every(([key, value]) => track2[key] === value)

export default { checkSpotifyTrack };
