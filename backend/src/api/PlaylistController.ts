import { Request, Response } from "express";
import PlaylistService from "../service/PlaylistService";
import { wrapServiceResponse } from "./ControllerUtil";

const getPlaylists = async (req: Request, res: Response) => {
  wrapServiceResponse(res, PlaylistService.getPlaylists());
};

const addPlaylist = async (req: Request, res: Response) => {
  res.send([]);
};

export default { getPlaylists, addPlaylist };
