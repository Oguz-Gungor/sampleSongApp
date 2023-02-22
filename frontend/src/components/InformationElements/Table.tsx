import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import SearchBar from "../Input/SearchBar";
import "./Table.scss";

/**
 * Table component props additional to Component props
 */
export interface ITableProps extends IComponentProps {
  /**
   * row presentation of data to be displayed
   */
  rows: any[] | null;
  /**
   * list of columns in ITableColumn form
   */
  columnList: ITableColumn[];
  /**
   * Expanded renderer to render view element with selected row content
   * @param row selected row element
   * @returns element to be rendered on row click
   */
  expandRenderer?: (row: any) => React.ReactNode;
  /**
   * Attributes to be searched in table
   */
  searchAttributes?: string[];
  /**
   * View Element to be rendered as last row of table to handle add functionality 
   * @returns 
   */
  addRenderer?: () => React.ReactNode;
}

/**
 * column structure of Table component
 */
export interface ITableColumn {
  /**
   * Corresponding attribute key in element of data list
   */
  key: string;
  /**
   * Label to be displayed as column header
   */
  label: string;
}

/**
 * Table component to wrap html table with expand utilities using React flux cycle
 * @param props ITableComponentprops
 * @returns Wrapped expandable,searchable and styled table component
 */
export default function Table(props: ITableProps) {
  //state and dispatcher to handle selected row index
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  
  //state and dispatcher to handle content data changes
  const [rows, setRows] = React.useState(props.rows);

  //to load new content comes from props to state
  React.useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);

  return props.columnList && props.columnList.length > 0 ? (
    <div className={`table-container ${props.className}`}>
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
      <table className={"table"}>
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
