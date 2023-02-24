import { Express } from "express";
import { Dialect, Sequelize, Transaction } from "sequelize";
import Playlist from "../model/Playlist";
import PlaylistTrack from "../model/PlaylistTrack";
import Track from "../model/Track";
import User from "../model/User";
import dotenv from "dotenv";
import LoggingMiddleware from "../middlewares/LoggingMiddleware";

dotenv.config();

/**
 * sequelize ORM database client
 */
export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? ""),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
});

/**
 * To handle database aspect,connetions,loads in startup phase
 * @param app express app
 */
export default function databaseLoader(app: Express) {
  //Models to be synched with database
  const utilInstances = [
    User.util,
    Playlist.util,
    Track.util,
    PlaylistTrack.util
  ];

  //todo : set transaction for init methods
  //To initialize tables and relations in db
  const initializeDB = async (t: Transaction) => {
    //Initialize tables
    await Promise.all(
      utilInstances.map(async (utilInstance) => {
        await utilInstance.init(sequelize);
        return utilInstance;
      })
    );
    //Set relations
    await Promise.all(
      utilInstances.map(async (utilInstance) => {
        await utilInstance.setRelations();
        return utilInstance;
      })
    );
    //sync relations with db
    await Promise.all(
      utilInstances.map(async (utilInstance) => {
        await utilInstance.sync();
        return utilInstance;
      })
    );
    //creates initial user
    await User.User.create({
      name: "oguz",
      email: "asd@asd.asd",
      password: "123",
    }).catch((err) => {
      LoggingMiddleware.logger.info("Error on adding default user")
    });
  };

  //To connect to database on startup, retry on connection error
  const tryConn = (retrialCountLeft: number) =>
    retrialCountLeft > 0
      ? sequelize
          .transaction(initializeDB)
          .then(() => {
            LoggingMiddleware.logger.info(
              "Database Connection has been established"
            );
          })
          .catch((err) => {
            LoggingMiddleware.logger.error("Database Connection error");
            LoggingMiddleware.logger.info(
              `Connection retrial will be held in ${
                process.env.DB_CONNECTION_RETRIAL_TIMEOUT
              } ms, ${retrialCountLeft - 1} retrials left`
            );
            const timeout = setTimeout(() => {
              tryConn(retrialCountLeft - 1);
              clearTimeout(timeout);
            }, parseInt(process.env.DB_CONNECTION_RETRIAL_TIMEOUT ?? "5000"));
          })
      : LoggingMiddleware.logger.error("Database could not be connected");
  tryConn(parseInt(process.env.DB_CONNECTION_RETRIAL_COUNT ?? "5"));
}
