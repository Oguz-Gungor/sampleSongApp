import { NextFunction, Request, Response } from "express";
import winston, { LoggerOptions } from "winston";

//colors: { info: "blue", error: "red" },
const logConfiguration: LoggerOptions = {
  transports: [new winston.transports.Console()],
  level: "http"
};

const logger = winston.createLogger(logConfiguration);

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  //todo : check is track content valid by requesting spotify api
  logger.http(`New ${req.method} request has been received for ${req.path}`);
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

export default { requestLogger, errorLogger ,logger};
