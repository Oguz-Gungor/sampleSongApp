import * as React from "react";
import "./Table.scss";

export interface ITableProps {
  rows: any[];
  columnList: ITableColumn[];
  expandRenderer?: (row: any) => React.ReactNode;
}
export interface ITableColumn {
  key: string;
  label: string;
}

export default function Table(props: ITableProps) {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  return props.columnList && props.columnList.length > 0 ? (
    <table className="table">
      <thead>
        <tr className="header">
          {props.columnList.map(({ label }) => (
            <th>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => (
          <>
            <tr
              className="row"
              onClick={() =>
                props.expandRenderer &&
                setSelectedRow(selectedRow == index ? null : index)
              }
            >
              {props.columnList.map(({ key }) => (
                <td>{row[key]}</td>
              ))}
            </tr>
            {props.expandRenderer &&<tr>
              <td colSpan={props.columnList.length} className={`expand-row ${selectedRow === index && "expand"}`}>
                  {
                  selectedRow != null &&
                  selectedRow === index
                    ? props.expandRenderer(row)
                    : "..."}
              </td>
            </tr>}
          </>
        ))}
      </tbody>
    </table>
  ) : null;
}
