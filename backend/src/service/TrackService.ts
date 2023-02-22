import { IRequestInterface } from "../interfaces/RequestInterfaces";
import Playlist from "../model/Playlist";
import PlaylistTrack from "../model/PlaylistTrack";
import Track, { ITrack, tracks } from "../model/Track";

const getTracks = async (
  playlistId: number
): Promise<IRequestInterface<ITrack[]>> => {
  const fetchedTracks = tracks[playlistId];
  if (fetchedTracks == null) {
    //todo : log invalid playlist id
    return { status: 400, dto: "Invalid request content" };
  }
  return { status: 200, dto: fetchedTracks };
};

const addTrack = async (
  trackInfo: any
): Promise<IRequestInterface<ITrack[]>> => {
  console.log("asd", trackInfo);
  await Track.Track.create(
    { ...trackInfo, playlists: [{ id: trackInfo.playlistId }] },
    { include: Playlist.Playlist }
  );
  // if (fetchedTracks == null) {
  //   //todo : log invalid playlist id
  //   return { status: 400, dto: "Invalid request content" };
  // }
  return { status: 200, dto: tracks[1] };
};

export default { getTracks, addTrack };
