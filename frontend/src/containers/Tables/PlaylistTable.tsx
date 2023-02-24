import * as React from "react";
import TrackTable from "./TrackTable";
import "./PlaylistTable.scss";
import { IFetcherComponentProps } from "../../util/CommonInterfaces";
import { addPlaylistConfig, getPlaylistConfig } from "../../api/Playlist";
import Form from "../../components/Input/Form";
import TextInput from "../../components/Input/TextInput";
import Table from "../../components/InformationElements/Table";
import withReduxFetch from "../../util/hocs/withReduxFetch";
import RequestReducer from "../../redux/RequestReducer";
import LabelConfig from "../../config/LabelConfig.json";
import Button from "../../components/Button/Button";

/**
 * list of columns in playlist table
 */
//todo : define interface
const columnList = [
  { key: "name", label: LabelConfig.PLAYLIST_NAME_COLUMN },
  { key: "trackCount", label: LabelConfig.PLAYLIST_TRACK_COUNT_COLUMN },
];

/**
 * Table to display list of playlists fetched from backend
 * @param props an object contains request result as payload attribute and post request dispatcher for related content
 * @returns Playlist table element view
 */
function PlayListTable(props: IFetcherComponentProps<any[] | null>) {
  return (
    <Table
      className="playlist-table"
      rows={props.payload}
      columnList={columnList}
      expandRenderer={(row) => <TrackTable playlistId={row.id} />}
      addRenderer={() => <AddPlaylist {...props} />}
    />
  );
}

/**
 * Playlist add row element to containt form elements of playlist to be added
 * @param postConfig addPlaylist request axios config
 * @returns Add row element view
 */
function AddPlaylist({ setPostConfig }: IFetcherComponentProps<any[] | null>) {
  //State for whether add button is clicked or not
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <div className={`add-row flex-row ${isClicked ? "open" : "closed"}`}>
      {isClicked ? (
        <>
          <Form
            onSubmit={(formData) => setPostConfig(addPlaylistConfig(formData))}
          >
            <TextInput
              id="name"
              placeHolder={LabelConfig.ADD_PLAYLIST_PLACEHOLDER}
            />
          </Form>
          <Button onClick={() => setIsClicked(false)}>{LabelConfig.CANCEL_LABEL}</Button>
        </>
      ) : (
        <span onClick={() => setIsClicked(true)}>+</span>
      )}
    </div>
  );
}

/**
 * Table to display list of playlists fetched from backend
 */
// export table inside withLocalFetch higher order component to commit related request and retrieve response in props data
// export default withLocalFetch(() => getPlaylistConfig, PlayListTable);
export default withReduxFetch<{},any[]>(
  () => getPlaylistConfig,
  (state) => state.request.playlists,
  RequestReducer.ActionType.PLAYLISTS,
  PlayListTable
);
