import { generateQueryParams } from "../util/UtilFunctions";

export const getTracksConfig = ({ playlistId }: any) => ({
    method: "get",
    url: `/tracks${generateQueryParams({ id: playlistId })}`,
    headers: {},
  });
  