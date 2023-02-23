import * as React from "react";
import { useSelector } from "react-redux";
import TextInput, { ITextInputProps } from "./TextInput";
import "./SpotifyBar.scss";
import { useLocalFetch, useReduxFetch } from "../../util/CustomHooks";
import { spotifySearch, spotifyToken } from "../../api/Spotify";
import Table from "../InformationElements/Table";
import { columnList } from "../../containers/Tables/TrackTable";
import { wrappedAxios } from "../../util/UtilFunctions";
import RequestReducer from "../../redux/RequestReducer";

/**
 * SpotifyBar component to generate a content wrapped with search functionality from spotify api
 * @param props callback on change, placeholder, type, id and label of input element
 * @returns Text input with utility, search from spotify API integration and style
 */
export default function SpotifyBar(props: ITextInputProps) {
  const playlists = useSelector((state: any) => state.request.playlists.payload);
  //todo : debounce mechanism on setSearchText
  const [searchText, setSearchText] = React.useState("");
  const { payload, error, isLoading, setPostConfig } = useLocalFetch<any>(
    {},
    false,
    false
  );
  //to get spotify token from redux to use it on search, and use dispatcher to refresh token on expire
  const { payload: spotifyToken, setPostConfig: fetchSpotifyTokenWithConfig } =
    useReduxFetch(
      null,
      (state: any) => state.request.spotifyToken,
      RequestReducer.ActionType.SPOTIFY_TOKEN,
      false
    );
  const isSearchTextExists = searchText && searchText !== "";
  React.useEffect(() => {
    if (isSearchTextExists && spotifyToken) {
      setPostConfig(spotifySearch(spotifyToken, searchText));
    }
  }, [searchText, spotifyToken]);

  React.useEffect(() => {
    //todo : check if error is token expiration
    // fetchSpotifyTokenWithConfig(spotifyToken);
  }, [error]);

  React.useEffect(() => {}, [error]);
  const rows = isSearchTextExists
    ? (payload?.tracks?.items ?? []).map((item: any) => ({
        track: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        link: item?.external_urls?.spotify,
        image: item?.album?.images[0].url,
        id: item?.id,
      }))
    : [];
  //todo: paging with infinite scroll
  return (
    <div className={`flex-column spotify-bar ${props.className}`}>
      <TextInput
        onChange={(value) => setSearchText(value)}
        placeHolder={props.placeHolder}
      />
      {rows && rows.length > 0 && (
        <div className="extend-wrapper">
          <Table
            className="track-table"
            rows={rows}
            columnList={columnList}
            expandRenderer={(row) => (
              <div
                onClick={() =>
                  wrappedAxios({
                    method: "post",
                    url: "/track",
                    headers: {},
                    data: { trackInfo: row, playlistId: 1 },
                  })
                }
              >
                add
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
