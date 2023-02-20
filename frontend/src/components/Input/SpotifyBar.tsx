import * as React from "react";
import { useSelector } from "react-redux";
import { IComponentProps } from "../../util/CommonInterfaces";
import TextInput, { ITextInputProps } from "./TextInput";
import "./SpotifyBar.scss";
import { useLocalFetch } from "../../util/CustomHooks";
import { spotifySearch, spotifyToken } from "../../api/Spotify";
import Table from "../InformationElements/Table";
import { columnList } from "../../containers/Tables/TrackTable";
import { wrappedAxios } from "../../util/UtilFunctions";

export interface ISpotifyBarProps extends IComponentProps, ITextInputProps {}

export default function SpotifyBar(props: ISpotifyBarProps) {
  //todo : debounce mechanism on setSearchText
  const spotifyToken = useSelector(
    (state: any) => state.request.spotifyToken.payload
  );
  const [searchText, setSearchText] = React.useState("");
  const { payload, error, isLoading, setPostConfig } = useLocalFetch<any>(
    {},
    false,
    false
  );

  const isSearchTextExists = searchText && searchText !== "";
  React.useEffect(() => {
    if (isSearchTextExists) {
      setPostConfig(spotifySearch(spotifyToken, searchText));
    }
  }, [searchText]);
  console.log(payload?.tracks?.items);
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
  console.log(rows);
  return (
    <div className="flex-column spotify-bar">
      <TextInput
        className={`${props.className}`}
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
                    data: row,
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
