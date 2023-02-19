import { AxiosRequestConfig } from "axios";
import * as React from "react";
import { IFetcherComponentProps } from "../CommonInterfaces";
import { useLocalFetch } from "../CustomHooks";

export default function withLocalFetch<T, U>(
  getRequestConfig: (props: T) => AxiosRequestConfig,
  Component: React.FC<IFetcherComponentProps<U>>
) {
  return (props: T) => {
    const { payload, isLoading, error, setPostConfig } = useLocalFetch<U>(
      getRequestConfig(props)
    );
    if (isLoading) {
      return <>Loading...</>;
    }
    if (error) {
      return <>Error</>;
    }
    return <Component {...{ ...props, payload, setPostConfig }} />;
  };
}
