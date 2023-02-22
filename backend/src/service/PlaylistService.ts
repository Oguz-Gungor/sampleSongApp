import { IRequestInterface } from "../interfaces/RequestInterfaces";
import Playlist, { IPlaylist } from "../model/Playlist";
import User from "../model/User";

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

const getPlaylists = async (userId: any): Promise<IRequestInterface<any[]>> => {
  return {
    status: 200,
    dto: await Playlist.Playlist.findAll({ where: { UserId: userId } }),
  };
};

const addPlaylist = async (
  playlistData: any,
  userId: any
): Promise<IRequestInterface<IPlaylist[]>> => {
  await Playlist.Playlist.create(
    { ...playlistData, UserId: userId },
    { include: [User.User] }
  );
  return getPlaylists(userId);
};

export default { getPlaylists, addPlaylist };
