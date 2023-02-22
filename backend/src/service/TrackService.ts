import { IRequestInterface } from "../interfaces/RequestInterfaces";
import PlaylistTrack from "../model/PlaylistTrack";
import Track from "../model/Track";
import { sequelize } from "../server";

const getTracks = async (
  playlistId: number
): Promise<IRequestInterface<any[]>> => {
  const tracks = await sequelize.transaction(async (t) => {
    const trackPlayList = await PlaylistTrack.PlaylistTrack.findAll({
      where: { PlaylistId: playlistId },
    });
    return await Track.Track.findAll({
      where: { id: trackPlayList.map((element: any) => element.TrackId) },
    });
  });

  //todo : log invalid playlist id
  //return { status: 400, dto: "Invalid request content" };

  return { status: 200, dto: tracks };
};

const addTrack = async (trackInfo: any): Promise<IRequestInterface<any>> => {
  const track = await sequelize.transaction(async (t) => {
    const track = await Track.Track.create(trackInfo, { transaction: t });
    await PlaylistTrack.PlaylistTrack.create(
      { PlaylistId: trackInfo.playlistId, TrackId: track.id },
      { transaction: t }
    );
    return track;
  });
  // if (fetchedTracks == null) {
  //   //todo : log invalid playlist id
  //   return { status: 400, dto: "Invalid request content" };
  // }
  return { status: 200, dto: track };
};

export default { getTracks, addTrack };
