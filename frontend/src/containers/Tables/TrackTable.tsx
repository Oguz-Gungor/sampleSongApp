import * as React from "react";
import { getTracksConfig } from "../../api/Tracks";
import Button from "../../components/Button/Button";
import Table from "../../components/InformationElements/Table";
import { IFetcherComponentProps } from "../../util/CommonInterfaces";
import withLocalFetch from "../../util/hocs/withLocalFetch";
import "./TrackTable.scss";

/**
 * list of columns in track table
 */
//todo : define interface
export const columnList = [
  { key: "track", label: "Track" },
  { key: "album", label: "Album" },
  { key: "artist", label: "Artist" },
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
function TrackTable(props: IFetcherComponentProps<any[]>) {
  return (
    <Table
      className="track-table"
      rows={props.payload}
      columnList={columnList}
      searchAttributes={columnList.map(({ key }) => key)}
      expandRenderer={(row) => <TrackTableExpandRenderer/>}
    />
  );
}

const TrackTableExpandRenderer = () => (
  <div className="flex-row expand-flex-row">
    <Button>Set Anthem</Button>
    <Button>Remove</Button>
  </div>
);

/**
 * Table to display list of tracks fetched from backend in given playlist
 */
//export table inside withLocalFetch higher order component to commit related request and retrieve response in props data
export default withLocalFetch<ITrackTableProps, any[]>(
  getTracksConfig,
  TrackTable
);
