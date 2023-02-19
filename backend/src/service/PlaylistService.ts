import { IRequestInterface } from "../interfaces/RequestInterfaces";
import { IPlaylist } from "../model/Playlist";

const playlists = [
  {
    id: 1,
    name: "Bard",
    trackCount: 2,
  },
  {
    id: 2,
    name: "Metal",
    trackCount: 3,
  },
];

const getPlaylists = (): IRequestInterface<IPlaylist[]> => {
  return { status: 200, dto: playlists };
};

export default { getPlaylists };
