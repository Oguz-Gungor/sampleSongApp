import { NextFunction, Request, Response } from "express";
import SpotifyService from "../service/SpotifyService";

const checkSpotifyTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spotifyApi = SpotifyService.getSpotifyApi();
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
};

const compareTracks = (track1: any, track2: any) => {
  //todo: compare items
  return true;
};

export default { checkSpotifyTrack };
