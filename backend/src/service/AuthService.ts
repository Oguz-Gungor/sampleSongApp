import { IRequestInterface } from "../interfaces/RequestInterfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";

const login = async (
  requestUsername: string,
  requestPassword: string
): Promise<IRequestInterface<string>> => {
  const user = await checkUser(requestUsername, requestPassword);
  if (user != null) {
    const token = generateToken(user.id);
    return { status: 200, dto: token };
  } else {
    return { status: 403, dto: "Invalid credentials" };
  }
};

const register = async (formData: {
  [key: string]: any;
}): Promise<IRequestInterface<string>> => {
  const user = await User.User.create(formData);
  if (user != null) {
    const token = generateToken(user.id);
    return { status: 200, dto: token };
  } else {
    return { status: 403, dto: "Invalid credentials" };
  }
};

const checkUser = async (requestUsername: string, requestPassword: string) => {
  const users = await User.User.findAll({where:{name:requestUsername}})
  return users.find(({password }) => 
      password && bcrypt.compareSync(requestPassword, password)
  );
};

const generateToken = (id?: number) => {
  return jwt.sign({ id }, process.env.SECRET_KEY ?? "", {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
};

export default { login, register };
