import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import TextInput from "./TextInput";

export interface ISearchBarProps extends IComponentProps {
  list: { [key: string]: any }[];
  filterAttributes: string[];
  callback: (list: { [key: string]: any }[]) => void;
}

export default function SearchBar(props: ISearchBarProps) {
  //todo : debounce mechanism on setSearchText
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    if (searchText != "") {
      props.callback(
        props.list.filter((element) =>
          props.filterAttributes.some((attribute) =>
            element[attribute].includes(searchText)
          )
        )
      );
    }
  }, [searchText]);

  return (
    <TextInput
      className={`search-bar ${props.className}`}
      onChange={(value) => setSearchText(value)}
    />
  );
}
