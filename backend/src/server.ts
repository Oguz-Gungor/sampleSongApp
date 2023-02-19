import express, { Express, Request, Response } from "express";
var cors = require("cors");
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

app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  res.send({ name: "Hello, this is Express + TypeScript" });
});

app.get("/playlists", async (req: Request, res: Response) => {
  res.send(playlists);
});

app.post("/playlists", async (req: Request, res: Response) => {
    console.log("playlists")
    res.send([]);
  });

app.get("/tracks", async (req: Request, res: Response) => {
  const playlistId = req.query.id as string;
  res.send(tracks[parseInt(playlistId)]);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
