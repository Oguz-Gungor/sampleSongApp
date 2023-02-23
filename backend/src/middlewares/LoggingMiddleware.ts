import { NextFunction, Request, Response } from "express";
import winston, { LoggerOptions } from "winston";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configuration to be used for winston logger
 */
const logConfiguration: LoggerOptions = {
  transports: [new winston.transports.Console()],
  level: process.env.WINSTON_LOG_LEVEL
};

/**
 * winston logger instance
 */
const logger = winston.createLogger(logConfiguration);

/**
 * Middleware to log requests with winston
 * @param req REST request
 * @param res REST response
 * @param next function to call next handler
 */
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  //todo : check is track content valid by requesting spotify api
  logger.http(`New ${req.method} request has been received for ${req.path}`);
  next();
};

/**
 * Middleware to log errors with winston
 * @param err error stack from earlier handlers
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("error : " + err);
  next();
};

export default { requestLogger, errorLogger, logger };
