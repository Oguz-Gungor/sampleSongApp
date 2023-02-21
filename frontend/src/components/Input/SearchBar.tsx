import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import TextInput, { ITextInputProps } from "./TextInput";

/**
 * SearchBar component props additional to TextInputProps
 */
export interface ISearchBarProps extends ITextInputProps {
  /**
   * List of items search will be commited on
   */
  list: { [key: string]: any }[] | null;
  /**
   * Attributes to search for in list elements
   */
  filterAttributes: string[];
  /**
   * callback to be handled after search is committed
   * @param list filtered list
   */
  callback: (list: { [key: string]: any }[]) => void;
}

/**
 * SearchBar component to add search functionality to TextInput component on given list with specified attributes
 * @param props ISearchBarProps
 * @returns Text Input component to use search functionality on given list with given attributes
 */
export default function SearchBar(props: ISearchBarProps) {
  //todo : debounce mechanism on setSearchText
  //State to contain search text
  const [searchText, setSearchText] = React.useState("");

  //Hook callback to be handled on search input
  React.useEffect(() => {
    if (props.list) {
      props.callback(
        props.list.filter((element) =>
          props.filterAttributes.some(
            (attribute) =>
              element[attribute] && element[attribute].includes(searchText)
          )
        )
      );
    }
  }, [searchText]);

  return (
    <TextInput
      className={`search-bar ${props.className}`}
      onChange={(value) => setSearchText(value)}
      placeHolder={props.placeHolder}
    />
  );
}
