import { AxiosRequestConfig } from "axios";
import * as React from "react";
import { IFetcherComponentProps } from "../CommonInterfaces";
import { useLocalFetch } from "../CustomHooks";
import withFetch from "./withFetch";

/**
 * Higher order component to wrap component with request cycle internals with react states
 * @param getRequestConfig axios request config
 * @param Component component to be wrapped
 * @returns wrapped component with request cycle internals as additional props
 */
export default function withLocalFetch<T, U>(
  getRequestConfig: (props: T) => AxiosRequestConfig,
  Component: React.FC<IFetcherComponentProps<U>>
) {
  return withFetch<T, U>(
    (props: T) => useLocalFetch<U>(getRequestConfig(props)),
    Component
  );
}
