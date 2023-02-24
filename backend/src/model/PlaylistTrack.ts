import { Sequelize, Model, DataTypes } from "sequelize";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import { ModelCreator } from "./ModelCreator";
import Playlist from "./Playlist";
import Track from "./Track";
import dotenv from "dotenv";

dotenv.config();
/**
 * Object model representation of Playlist-Track relation
 */
class PlaylistTrack extends Model {
}


/**
 * Util class to handle Playlist-Track relation related operations
 */
class PlaylistTrackCreator extends ModelCreator {
  constructor() {
    super();
  }
  /**
   * Init Playlist-Track relation table on system start (if not exists)
   * @param sequelize 
   */
  public async init(sequelize: Sequelize): Promise<void> {
    await PlaylistTrack.init(
      {},
      {
        sequelize,
        tableName: process.env.DB_PLAYLIST_TRACK_RELATION_TABLE_NAME,
        timestamps: false,
      }
    );
    await PlaylistTrack.sync();
    LoggingMiddleware.logger.info("Playlist Track relation table has been created");
  }

  /**
   * Init Playlist-Track relations
   */
  public setRelations(): void {
    PlaylistTrack.belongsTo(Playlist.Playlist);
    PlaylistTrack.belongsTo(Track.Track);
  }

  /**
   * Synchronize all changes with database
   */
  public async sync(): Promise<void> {
    await PlaylistTrack.sync({alter:true});
  }
}

export default { PlaylistTrack, util: new PlaylistTrackCreator() };
