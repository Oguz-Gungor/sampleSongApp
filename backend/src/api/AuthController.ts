import { NextFunction, Request, Response } from "express";
import AuthService from "../service/AuthService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

/**
 * Controller to parse username and password in request content and call login service with parsed attributes
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const login = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const requestUsername = req.query.username as string;
    const requestPassword = req.query.password as string;
    await wrapServiceResponse(
      res,
      AuthService.login(requestUsername, requestPassword)
    );
  }, next);

  /**
 * Controller to parse form data in request content and call register service with parsed attribute
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const register = (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const formData = req.body;
    await wrapServiceResponse(res, AuthService.register(formData));
  }, next);

/**
 * Controller to set token in response after auth validation
 * @param req REST request
 * @param res REST response
 * @param next next handler
 */
const validate = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(async () => {
    const token = (req.headers.authorization ?? "").split(" ")[1];
    res.send(token);
  }, next);

export default { login, register, validate };
