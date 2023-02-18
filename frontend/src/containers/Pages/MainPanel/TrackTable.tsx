import * as React from "react";
import Table from "../../../components/InformationElements/Table";

const columnList = [
  { key: "track", label: "Track" },
  { key: "album", label: "Album" },
  { key: "artist", label: "Artist" },
];

const rows = [
  {
    track: "Under A Violet Moon",
    album: "Under A Violet Moon",
    artist: "Blackmore's Night",
  },
  { track: "City of the Dead", album: "Arcadia", artist: "Eurielle" },
];

export default function TrackTable() {
  return (
    <Table
      rows={rows}
      columnList={columnList}
    />
  );
}
