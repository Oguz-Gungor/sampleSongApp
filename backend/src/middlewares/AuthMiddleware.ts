import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../service/AuthService";

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
    (err, decode) => {
      if (err) {
        //todo : classify error and log
        return false;
      } else {
        const parsedID = (decode as jwt.JwtPayload).id;
        if (users.some((user) => user.id === parsedID)) {
          return true;
        }
      }
    }
  );
};

export default { validateToken };
