import { Sequelize, Model, DataTypes, InferAttributes } from "sequelize";
import { ModelCreator } from "./ModelCreator";
import Playlist from "./Playlist";
import bcrypt from "bcrypt";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";
import dotenv from "dotenv";
import Track from "./Track";

dotenv.config();
/**
 * Object model representation of User table
 */
export class User extends Model {
  public id?: number;
  public name!: string;
  public email?: string;
  public password?: string;
}

/**
 * Util class to handle User model related operations
 */
class UserCreator extends ModelCreator {
  constructor() {
    super();
  }
  /**
   * Init User table on system start (if not exists)
   * @param sequelize
   */
  public async init(sequelize: Sequelize): Promise<void> {
    await User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
        },
        email: {
          type: DataTypes.STRING(255),
          validate: { is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          set(val: string) {
            this.setDataValue("password", bcrypt.hashSync(val, 8));
          },
        },
      },
      {
        sequelize,
        tableName: process.env.DB_USER_TABLE_NAME,
        timestamps: false,
      }
    );
    await User.sync();
    LoggingMiddleware.logger.info("User table has been created");
  }

  /**
   * Init User relations
   */
  public setRelations(): void {
    User.hasMany(Playlist.Playlist);
    User.belongsTo(Track.Track);
  }

  /**
   * Synchronize all changes with database
   */
  public async sync(): Promise<void> {
    await User.sync({ alter: true });
  }
}

export interface IUserAttributes extends InferAttributes<User>{};
export default { User, util: new UserCreator() };
