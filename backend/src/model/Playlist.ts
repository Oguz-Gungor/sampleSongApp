import { Sequelize, Model, DataTypes } from "sequelize";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import { sequelize } from "../server";
import { ModelCreator } from "./ModelCreator";
import PlaylistTrack from "./PlaylistTrack";
import Track from "./Track";
import User from "./User";

class Playlist extends Model {
  public id?: string;
  public name?: string;
  public count?: number;
}
class PlaylistCreator extends ModelCreator {
  constructor() {
    super();
  }
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
    LoggingMiddleware.logger.info("Playlist table has been created")
  }

  public setRelations(): void {
    Playlist.belongsTo(User.User);
    Playlist.belongsToMany(Track.Track, {through: PlaylistTrack.PlaylistTrack});
  }

  public async sync(): Promise <void> {
    await Playlist.sync({alter:true});
  }
}

export default { Playlist, util: new PlaylistCreator() };

export interface IPlaylist {
  id: number;
  name: string;
  trackCount: number;
}

export const playlists: IPlaylist[] = [
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
