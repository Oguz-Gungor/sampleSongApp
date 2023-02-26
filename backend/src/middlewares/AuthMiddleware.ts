import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import dotenv from "dotenv";

dotenv.config();
/**
 * Middleware to validate token inside request
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //destructured key-token pair inside request header
  const [key, token] = (req.headers.authorization ?? "").split(" ");
  const isVerified = await verifyToken(key, token);
  if (isVerified) {
    next();
  } else {
    //todo : unhandled error log
    res.status(403).send(process.env.INVALID_TOKEN_MESSAGE);
  }
};

/**
 * To check request authorization content is verified
 * @param key token key inside request authorization
 * @param token token string
 * @returns whether key and token pairs are valid
 */
const verifyToken = async (key: string, token: string) => {
  if (key != process.env.TOKEN_KEY) {
    return false;
  }
  return await jwt.verify(
    token,
    process.env.SECRET_KEY ?? "",
    async (err, decode) => {
      if (err) {
        //todo : classify error and log
        return false;
      } else {
        const parsedID = (decode as jwt.JwtPayload).id;
        const user = await User.User.findOne({ where: { id: parsedID } });
        return user != null;
      }
    }
  );
};

/**
 * To fetch user id from authorization token
 * @param req REST request
 * @returns user id
 */
const getUserIDFromToken = async (req: Request) : Promise<any> => {
  const [key, token] = (req.headers.authorization ?? "").split(" ");
  return await jwt.verify(
    token,
    process.env.SECRET_KEY ?? "",
    async (err, decode) => {
      if (err) {
        //todo : classify error and log
        return false;
      } else {
        return (decode as jwt.JwtPayload).id;
      }
    }
  );
};

export default { validateToken, getUserIDFromToken };
