import * as React from "react";
import Table from "../../../components/InformationElements/Table";
import TrackTable from "./TrackTable";

const columnList = [{ key: "name", label: "Name" }];

const rows = [
  {
    name: "Rock",
  },
  {
    name: "Metal",
  },
];

export default function PlayListTable() {
  return (
    <Table
      rows={rows}
      columnList={columnList}
      expandRenderer={(row) => <TrackTable />}
    />
  );
}
