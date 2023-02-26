import { IRequestInterface } from "../interfaces/RequestInterfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUserAttributes } from "../model/User";
import dotenv from "dotenv";

dotenv.config();

/**
 * To handle login operation with given credentials
 * @param requestUsername username in request
 * @param requestPassword password in request
 * @returns Generated access token if credentials are valid
 */
const login = async (
  requestUsername: string,
  requestPassword: string
): Promise<IRequestInterface<string>> => {
  const user = await checkUser(requestUsername, requestPassword);
  if (user != null) {
    const token = generateToken(user.id);
    return { status: 200, dto: token };
  } else {
    return { status: 403, dto: process.env.INVALID_CREDENTIALS_MESSAGE };
  }
};

/**
 * To handle user registry operations with given user data
 * @param formData user data to be registered to system
 * @returns 
 */
const register = async (formData: {
  [key: string]: any;
}): Promise<IRequestInterface<string>> => {
  const user:IUserAttributes = await User.User.create(formData);
  if (user != null) {
    const token: string = generateToken(user.id);
    return { status: 200, dto: token };
  } else {
    return { status: 403, dto: process.env.INVALID_CREDENTIALS_MESSAGE };
  }
};

/**
 * To check user with given credentials exists in database
 * @param requestUsername username in request
 * @param requestPassword password in request
 * @returns corresponding user with given credentials if there is any, otherwise returns null
 */
const checkUser = async (requestUsername: string, requestPassword: string):Promise<IUserAttributes|undefined> => {
  const users:IUserAttributes[] = await User.User.findAll({where:{name:requestUsername}})
  return users.find(({password }) => 
      password && bcrypt.compareSync(requestPassword, password)
  );
};

/**
 * To generate jwt token with given user id
 * @param id user id
 * @returns jwt token
 */
const generateToken = (id?: number):string => {
  return jwt.sign({ id }, process.env.SECRET_KEY ?? "", {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
};

export default { login, register };
