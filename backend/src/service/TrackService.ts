import { IRequestInterface } from "../interfaces/RequestInterfaces";
import { ITrack, tracks } from "../model/Track";

const getTracks = (playlistId: number): IRequestInterface<ITrack[]> => {
  const fetchedTracks = tracks[playlistId];
  if (fetchedTracks == null) {
    //todo : log invalid playlist id
    return { status: 400, dto: "Invalid request content" };
  }
  return { status: 200, dto: fetchedTracks };
};

export default { getTracks };
