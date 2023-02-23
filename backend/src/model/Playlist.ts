import { Sequelize, Model, DataTypes } from "sequelize";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import { ModelCreator } from "./ModelCreator";
import PlaylistTrack from "./PlaylistTrack";
import Track from "./Track";
import User from "./User";

/**
 * Object model representation of Playlist model
 */
class Playlist extends Model {
  public id?: string;
  public name?: string;
  public count?: number;
}

/**
 * Util class to handle Playlist model related operations
 */
class PlaylistCreator extends ModelCreator {
  constructor() {
    super();
  }
  /**
   * Init Playlist model table on system start (if not exists)
   * @param sequelize 
   */
  public async init(sequelize: Sequelize): Promise<void> {
    await Playlist.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING(255),
        },
        count: {
          type: DataTypes.STRING(255),
        },
      },
      {
        sequelize,
        tableName: "playlist",
        timestamps: false,
      }
    );
    await Playlist.sync();
    LoggingMiddleware.logger.info("Playlist-Track relation table has been created")
  }

   /**
   * Init Playlist relations
   */
  public setRelations(): void {
    Playlist.belongsTo(User.User);
    Playlist.belongsToMany(Track.Track, {through: PlaylistTrack.PlaylistTrack});
  }

   /**
   * Synchronize all changes with database
   */
  public async sync(): Promise <void> {
    await Playlist.sync({alter:true});
  }
}

export default { Playlist, util: new PlaylistCreator() };