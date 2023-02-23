import { IRequestInterface } from "../interfaces/RequestInterfaces";
import PlaylistTrack from "../model/PlaylistTrack";
import Track from "../model/Track";
import { sequelize } from "../server";


/**
 * To get Tracks from given playlist id
 * @param playlistId id of playlist that tracks resides in
 * @returns tracks of playlist
 */
const getTracks = async (
  playlistId: number
): Promise<IRequestInterface<any[]>> => {
  //To handle transaction for geting track ids related with given playlist id and get attributes of those tracks
  const tracks = await sequelize.transaction(async (t) => {
    //Get track ids linked with given playlist id
    const trackPlayList = await PlaylistTrack.PlaylistTrack.findAll({
      where: { PlaylistId: playlistId },
    });
    //Return attributes of list of track ids received from first query
    return await Track.Track.findAll({
      where: { id: trackPlayList.map((element: any) => element.TrackId) },
    });
  });
  return { status: 200, dto: tracks };
};

/**
 * To add track to database and link with given playlist
 * @param trackInfo Information of track to be added
 * @param playlistId id of playlist that track will be added to
 * @returns added track
 */
const addTrack = async (trackInfo: any,playlistId:number): Promise<IRequestInterface<any>> => {
  //to handle transaction for adding track to table and adding track to playlist-track relation 
  const track = await sequelize.transaction(async (t) => {
    //add track
    const track = await Track.Track.create(trackInfo, { transaction: t });
    
    //link track with playlist
    await PlaylistTrack.PlaylistTrack.create(
      { PlaylistId: playlistId, TrackId: track.id },
      { transaction: t }
    );
    return track;
  });
  return { status: 200, dto: track };
};

export default { getTracks, addTrack };
