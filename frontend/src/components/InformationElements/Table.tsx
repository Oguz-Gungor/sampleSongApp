import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import SearchBar from "../Input/SearchBar";
import "./Table.scss";

export interface ITableProps extends IComponentProps {
  rows: any[] | null;
  columnList: ITableColumn[];
  expandRenderer?: (row: any) => React.ReactNode;
  searchAttributes?: string[];
  addRenderer?: () => React.ReactNode;
}
export interface ITableColumn {
  key: string;
  label: string;
}

export default function Table(props: ITableProps) {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [rows, setRows] = React.useState(props.rows);

  React.useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);

  return props.columnList && props.columnList.length > 0 ? (
    <div className="table-container">
      {props.searchAttributes && props.searchAttributes.length > 0 && (
        <SearchBar
          filterAttributes={props.searchAttributes}
          list={props.rows}
          callback={(list) => setRows(list)}
          placeHolder={`Search for ${props.searchAttributes.reduce(
            (prevValue, attribute) => {
              const attributeLabel = props.columnList.find(
                ({ key }) => key === attribute
              )?.label;
              if (attributeLabel == null) {
                return prevValue;
              }
              return prevValue !== ""
                ? `${prevValue},${attributeLabel}`
                : attributeLabel;
            },
            ""
          )}`}
        />
      )}
      <table className={`table ${props.className}`}>
        <thead>
          <tr className="header">
            {props.columnList.map(({ label }) => (
              <th>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((row, index) => (
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
                {props.expandRenderer && (
                  <tr>
                    <td
                      colSpan={props.columnList.length}
                      className={`expand-row ${
                        selectedRow === index && "expand"
                      }`}
                    >
                      {selectedRow != null && selectedRow === index
                        ? props.expandRenderer(row)
                        : "..."}
                    </td>
                  </tr>
                )}
              </>
            ))}
          {props.addRenderer && (
            <tr>
              <td colSpan={props.columnList.length}>{props.addRenderer()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : null;
}
