import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [key, token] = (req.headers.authorization ?? "").split(" ");
  const isVerified = await verifyToken(key, token);
  if (isVerified) {
    next();
    
  } else {
    //todo : unhandled error log
    res.status(403).send("Validation error");
  }
};

const verifyToken = async (key: string, token: string) => {
  if (key != process.env.TOKEN_KEY) {
    return "Invalid token type";
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

const getUserIDFromToken = async (req: Request) => {
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
