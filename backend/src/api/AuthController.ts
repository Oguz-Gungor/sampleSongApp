import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthService from "../service/AuthService";
import { wrapServiceResponse } from "./ControllerUtil";

//login
const login = async (req: Request, res: Response) => {
  const requestUsername = req.query.username as string;
  const requestPassword = req.query.password as string;
  wrapServiceResponse(res, AuthService.login(requestUsername, requestPassword));
};

//validate
const validate = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization ?? "").split(" ")[1];
    res.send(token);
  } catch (ex) {}
};

export default { login, validate };
