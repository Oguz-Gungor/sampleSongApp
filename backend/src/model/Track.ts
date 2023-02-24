import { Sequelize, Model, DataTypes } from "sequelize";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import { ModelCreator } from "./ModelCreator";
import Playlist from "./Playlist";
import PlaylistTrack from "./PlaylistTrack";
import dotenv from "dotenv";
import User from "./User";

dotenv.config();
/**
 * Object model representation of Track table
 */
class Track extends Model {
  public track?: string;
  public artist?: string;
  public album?: string;
  public link?: string;
  public image?: string;
  public id?: string;
}

/**
 * Util class to handle Track model related operations
 */
class TrackCreator extends ModelCreator {
  constructor() {
    super();
  }
  /**
   * Init Track table on system start (if not exists)
   * @param sequelize
   */
  public async init(sequelize: Sequelize): Promise<void> {
    await Track.init(
      {
        id: {
          type: DataTypes.STRING(255),
          primaryKey: true,
        },
        track: {
          type: DataTypes.STRING(255),
        },
        artist: {
          type: DataTypes.STRING(255),
        },
        album: {
          type: DataTypes.STRING(255),
        },
        link: {
          type: DataTypes.STRING(255),
        },
        image: {
          type: DataTypes.STRING(255),
        },
      },
      {
        sequelize,
        tableName: process.env.DB_TRACK_TABLE_NAME,
        timestamps: false,
      }
    );
    await Track.sync();
    LoggingMiddleware.logger.info("Track table has been created");
  }

  /**
   * Init Track relations
   */
  public setRelations(): void {
    Track.belongsToMany(Playlist.Playlist, {
      through: PlaylistTrack.PlaylistTrack,
      constraints: true,
    });
    Track.hasMany(User.User);
  }

  /**
   * Synchronize all changes with database
   */
  public async sync(): Promise<void> {
    await Track.sync({ alter: true });
  }
}

export default { Track, util: new TrackCreator() };
