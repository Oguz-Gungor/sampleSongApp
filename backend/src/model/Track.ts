import { Sequelize, Model, DataTypes } from "sequelize";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import { ModelCreator } from "./ModelCreator";
import Playlist from "./Playlist";
import PlaylistTrack from "./PlaylistTrack";

class Track extends Model {
  public track?: string;
  public artist?: string;
  public album?: string;
  public link?: string;
  public image?: string;
}

class TrackCreator extends ModelCreator {
  constructor() {
    super();
  }
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
        tableName: "track",
        timestamps: false,
      }
    );
    await Track.sync();
    LoggingMiddleware.logger.info("Track table has been created");
  }

  public setRelations(): void {
    Track.belongsToMany(Playlist.Playlist, {
      through: PlaylistTrack.PlaylistTrack
    });
  }

  public async sync(): Promise<void> {
    await Track.sync({alter:true});
  }
}

export default { Track, util: new TrackCreator() };

export interface ITrack {
  track: string;
  album: string;
  artist: string;
}

export const tracks: { [key: number]: ITrack[] } = {
  1: [
    {
      track: "Under A Violet Moon",
      album: "Under A Violet Moon",
      artist: "Blackmore's Night",
    },
    { track: "City of the Dead", album: "Arcadia", artist: "Eurielle" },
  ],
  2: [
    {
      track: "Fade To Black",
      album: "Ride The Lightning",
      artist: "Metallica",
    },
    { track: "One", album: "And Justice for All", artist: "Metallica" },
    {
      track: "Wasted Years",
      album: "Somewhere in Time",
      artist: "Iron Maiden",
    },
  ],
};
