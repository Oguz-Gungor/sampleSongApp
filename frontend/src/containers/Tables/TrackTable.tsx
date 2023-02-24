import * as React from "react";
import {
  deleteTrack,
  getTracksConfig,
  setAnthemConfig,
} from "../../api/Tracks";
import Button from "../../components/Button/Button";
import Table from "../../components/InformationElements/Table";
import { IFetcherComponentProps } from "../../util/CommonInterfaces";
import withLocalFetch from "../../util/hocs/withLocalFetch";
import LabelConfig from "../../config/LabelConfig.json";
import "./TrackTable.scss";
import { useReduxFetch } from "../../util/CustomHooks";
import RequestReducer from "../../redux/RequestReducer";

/**
 * list of columns in track table
 */
//todo : define interface
export const columnList = [
  { key: "track", label: LabelConfig.TRACKLIST_TRACK_COLUMN },
  { key: "album", label: LabelConfig.TRACKLIST_ALBUM_COLUMN },
  { key: "artist", label: LabelConfig.TRACKLIST_ARTIST_COLUMN },
];

/**
 * interface to define track table element props
 */
interface ITrackTableProps extends JSX.IntrinsicAttributes {
  playlistId: number;
}

/**
 * Table to display list of tracks fetched from backend in given playlist
 * @param props an object contains request result as payload attribute and post request dispatcher for related content
 * @returns Track table element view
 */
function TrackTable(props: ITrackTableProps & IFetcherComponentProps<any[]>) {
  console.log(props.payload);
  return (
    <Table
      className="track-table"
      rows={props.payload}
      columnList={columnList}
      searchAttributes={columnList.map(({ key }) => key)}
      expandRenderer={(row) => (
        <TrackTableExpandRenderer
          row={row}
          setPostConfig={props.setPostConfig}
          playlistId={props?.playlistId}
        />
      )}
    />
  );
}

const TrackTableExpandRenderer = (props: any) => {
  const { setPostConfig } = useReduxFetch(
    null,
    (state) => state.request.anthem,
    RequestReducer.ActionType.ANTHEM
  );

  return (
    <div className="flex-row expand-flex-row">
      <Button
        onClick={() => {
          setPostConfig(setAnthemConfig({ trackInfo: props.row }));
        }}
      >
        Set Anthem
      </Button>
      <Button
        onClick={() => {
          props.setPostConfig(
            deleteTrack({ trackId: props.row.id, playlistId: props.playlistId })
          );
        }}
      >
        Remove
      </Button>
    </div>
  );
};

/**
 * Table to display list of tracks fetched from backend in given playlist
 */
//export table inside withLocalFetch higher order component to commit related request and retrieve response in props data
export default withLocalFetch<ITrackTableProps, any[]>(
  getTracksConfig,
  TrackTable
);
