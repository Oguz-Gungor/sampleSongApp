import * as React from "react";
import Table from "../../../components/InformationElements/Table";
import TrackTable from "./TrackTable";
import "./PlaylistTable.scss";
import withLocalFetch from "../../../util/hocs/withRequest";
import { IFetcherComponentProps } from "../../../util/CommonInterfaces";

const columnList = [
  { key: "name", label: "Name" },
  { key: "trackCount", label: "Track Count" },
];

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

function AddPlaylist({ setPostConfig }: IFetcherComponentProps<any[] | null>) {
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <div className={`add-row flex-row ${isClicked ? "open" : "closed"}`}>
      {isClicked ? (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input type={"text"} id="playlist" />
            <input type={"submit"} />
          </form>
          <span
            onClick={() =>
              setPostConfig({
                method: "post",
                url: "/playlists",
                headers: {},
              })
            }
          >
            "AddRow"
          </span>
          <span onClick={() => setIsClicked(false)}>cancel</span>
        </>
      ) : (
        <span onClick={() => setIsClicked(true)}>+</span>
      )}
    </div>
  );
}

export default withLocalFetch(
  () => ({
    method: "get",
    url: "/playlists",
    headers: {},
  }),
  PlayListTable
);
