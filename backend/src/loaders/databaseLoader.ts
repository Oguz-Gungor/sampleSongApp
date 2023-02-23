import { Express } from "express";
import { Sequelize, Transaction } from "sequelize";
import Playlist from "../model/Playlist";
import PlaylistTrack from "../model/PlaylistTrack";
import Track from "../model/Track";
import User from "../model/User";
import dotenv from "dotenv";

dotenv.config();

/**
 * sequelize ORM database client
 */
export const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? ""),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false
  });


  /**
   * To handle database aspect,connetions,loads in startup phase
   * @param app express app
   */
export default function databaseLoader(app:Express){
  
  //Models to be synched with database
  const utilInstances = [
    User.util,
    Playlist.util,
    Track.util,
    PlaylistTrack.util,
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
    await User.User.create({name:"oguz",
      email:"asd@asd.asd",
      password:"123"}).catch((err)=>{
        console.log("err on adding default user");
      })
  };
  
  //To connect to database on startup, retry on connection error
  const tryConn = () => sequelize.transaction(initializeDB).then(()=>{
    console.log("connection established");
  }).catch((err)=>{
    //todo: set timeout  
    console.log("db conn refused");
    console.log("error: " , err);
    const timeout = setTimeout(()=>{
    tryConn();
    clearTimeout(timeout)
    },5000);
  });
  tryConn();
  
}