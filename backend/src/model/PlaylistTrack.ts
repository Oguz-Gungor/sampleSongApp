import { Sequelize, Model, DataTypes } from "sequelize";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import { ModelCreator } from "./ModelCreator";
import Playlist from "./Playlist";
import Track from "./Track";

class PlaylistTrack extends Model {
  public id?: string;
  public name?: string;
  public count?: number;
}
class PlaylistTrackCreator extends ModelCreator {
  constructor() {
    super();
  }
  public async init(sequelize: Sequelize): Promise<void> {
    await PlaylistTrack.init(
      {},
      {
        sequelize,
        tableName: "playlist_track",
        timestamps: false,
      }
    );
    await PlaylistTrack.sync();
    LoggingMiddleware.logger.info("Playlist table has been created");
  }

  public setRelations(): void {
    PlaylistTrack.belongsTo(Playlist.Playlist);
    PlaylistTrack.belongsTo(Track.Track);
  }

  public async sync(): Promise<void> {
    await PlaylistTrack.sync({alter:true});
  }
}

export default { PlaylistTrack, util: new PlaylistTrackCreator() };
