import * as React from "react";
import { getTracksConfig } from "../../../api/Tracks";
import Table from "../../../components/InformationElements/Table";
import { IFetcherComponentProps } from "../../../util/CommonInterfaces";
import withLocalFetch from "../../../util/hocs/withRequest";
import "./TrackTable.scss";

const columnList = [
  { key: "track", label: "Track" },
  { key: "album", label: "Album" },
  { key: "artist", label: "Artist" },
];

interface ITrackTableProps extends JSX.IntrinsicAttributes {
  playlistId: number;
}

function TrackTable(props: IFetcherComponentProps<any[]>) {
  return (
    <Table
      className="track-table"
      rows={props.payload}
      columnList={columnList}
      searchAttributes={columnList.map(({ key }) => key)}
      expandRenderer={(row) => <div>setAnthem,remove</div>}
    />
  );
}

export default withLocalFetch<ITrackTableProps, any[]>(
  getTracksConfig,
  TrackTable
);
