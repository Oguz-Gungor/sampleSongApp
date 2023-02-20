import { NextFunction, Request, Response } from "express";
import winston from "winston";

const logConfiguration = {
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(logConfiguration);

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  //todo : check is track content valid by requesting spotify api
  logger.info(`New ${req.method} request has been received for ${req.path}`);
  next();
};

const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("error : " + err);
  next();
};

export default { requestLogger, errorLogger };
