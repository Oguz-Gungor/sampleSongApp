import { IRequestInterface } from "../interfaces/RequestInterfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const users = [
    {
      id: "1",
      username: "oguz",
      password: bcrypt.hashSync("123", 8),
    },
    {
      id: "2",
      username: "mustafa",
      password: bcrypt.hashSync("456", 8),
    },
  ];

const login = (
  requestUsername: string,
  requestPassword: string
): IRequestInterface<string> => {
  const user = checkUser(requestUsername, requestPassword);
  if (user != null) {
    const token = generateToken(user.id);
    return { status: 200, dto: token };
  } else {
    return { status: 403, dto: "Invalid credentials" };
  }
};

const checkUser = (requestUsername: string, requestPassword: string) => {
  return users.find(({ username, password }) => {
    return (
      requestUsername == username &&
      bcrypt.compareSync(requestPassword, password)
    );
  });
};

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_KEY ?? "", {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
};

export default {login}
