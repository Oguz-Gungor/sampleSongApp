import { IRequestInterface } from "../interfaces/RequestInterfaces";
import Playlist from "../model/Playlist";
import User from "../model/User";


/**
 * To get playlists of given user id
 * @param userId id of user whom request had been held by
 * @returns list of playlist user is related to
 */
const getPlaylists = async (userId: any): Promise<IRequestInterface<any[]>> => {
  return {
    status: 200,
    dto: await Playlist.Playlist.findAll({ where: { UserId: userId } }),
  };
};

/**
 * To add new playlist and relate it with given user
 * @param playlistData attributes of playlist to be created
 * @param userId id of user whom request had been held by
 * @returns list of playlist user has after create operations
 */
const addPlaylist = async (
  playlistData: any,
  userId: any
): Promise<IRequestInterface<any[]>> => {
  await Playlist.Playlist.create(
    { ...playlistData, UserId: userId },
    { include: [User.User] }
  );
  return getPlaylists(userId);
};

export default { getPlaylists, addPlaylist };
