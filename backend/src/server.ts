import express, { Express, Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app: Express = express();
const port = 3000;

const playlists = [
  {
    id: 1,
    name: "Bard",
    trackCount: 2,
  },
  {
    id: 2,
    name: "Metal",
    trackCount: 3,
  },
];

const tracks: { [key: number]: any } = {
  1: [
    {
      track: "Under A Violet Moon",
      album: "Under A Violet Moon",
      artist: "Blackmore's Night",
    },
    { track: "City of the Dead", album: "Arcadia", artist: "Eurielle" },
  ],
  2: [
    {
      track: "Fade To Black",
      album: "Ride The Lightning",
      artist: "Metallica",
    },
    { track: "One", album: "And Justice for All", artist: "Metallica" },
    {
      track: "Wasted Years",
      album: "Somewhere in Time",
      artist: "Iron Maiden",
    },
  ],
};

const users = [
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
const sampleToken = "token";

const env = {
  API_SECRET: "123",
  TOKEN_EXPIRE: 10,
};

app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  res.send({ name: "Hello, this is Express + TypeScript" });
});

app.get("/playlists", async (req: Request, res: Response) => {
  res.send(playlists);
});

app.post("/playlists", async (req: Request, res: Response) => {
  console.log("playlists");
  res.send([]);
});

app.get("/tracks", async (req: Request, res: Response) => {
  const playlistId = req.query.id as string;
  res.send(tracks[parseInt(playlistId)]);
});

app.get("/login", async (req: Request, res: Response) => {
  const requestUsername = req.query.username as string;
  const requestPassword = req.query.password as string;
  const user = checkUser(requestUsername, requestPassword);
  if (user != null) {
    const token = generateToken(user.id);
    res.send(token);
  } else {
    res.status(403).send("invalid credentials");
  }
});

app.get("/validate", async (req: Request, res: Response) => {
  const token = sampleToken;
  if (validateToken(token)) {
    res.send(token);
  } else {
    res.status(403).send("Invalid token");
  }
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});

const checkUser = (requestUsername: string, requestPassword: string) => {
  return users.find(({ username, password }) => {
    console.log(password);
    console.log(username);
    return (
      requestUsername == username &&
      bcrypt.compareSync(requestPassword, password)
    );
  });
};

const generateToken = (id: string) => {
  return jwt.sign({ id }, env.API_SECRET, { expiresIn: env.TOKEN_EXPIRE });
};
const validateToken = (token: string) => {
  return true;
};
