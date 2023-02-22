import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelCreator } from "./ModelCreator";
import Playlist from "./Playlist";
import bcrypt from "bcrypt";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";

class User extends Model {
  public id?: number;
  public name!: string;
  public email?: string;
  public password?: string;
}

class UserCreator extends ModelCreator {
  constructor() {
    super();
  }
  public async init(sequelize: Sequelize): Promise<void> {
    await User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
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
        tableName: "user",
        timestamps: false,
      }
    );
    await User.sync();
    LoggingMiddleware.logger.info("User table has been created")
  }

  public setRelations(): void {
    User.hasMany(Playlist.Playlist);
  }

  public async sync(): Promise <void> {
    await User.sync({alter:true});
  }
}

export default { User, util: new UserCreator() };
