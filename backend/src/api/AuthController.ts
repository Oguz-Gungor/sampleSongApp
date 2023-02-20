import { NextFunction, Request, Response } from "express";
import AuthService from "../service/AuthService";
import { withErrorHandler, wrapServiceResponse } from "./ControllerUtil";

//login
const login = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(() => {
    const requestUsername = req.query.username as string;
    const requestPassword = req.query.password as string;
    wrapServiceResponse(
      res,
      AuthService.login(requestUsername, requestPassword)
    );
  }, next);

//validate
const validate = async (req: Request, res: Response, next: NextFunction) =>
  withErrorHandler(() => {
    const token = (req.headers.authorization ?? "").split(" ")[1];
    res.send(token);
  }, next);

export default { login, validate };
