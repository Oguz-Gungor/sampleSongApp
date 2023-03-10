import { AxiosRequestConfig } from "axios";
import * as React from "react";
import { IFetcherComponentProps } from "../CommonInterfaces";
import { useLocalFetch, useReduxFetch } from "../CustomHooks";
import withFetch from "./withFetch";

/**
 * Higher order component to wrap component with request cycle internals with redux
 * @param getRequestConfig  axios request config
 * @param selectorFunction function to fetch desired object from redux
 * @param action redux dispatch action
 * @param Component component to be wrapped
 * @returns wrapped component with request cycle internals as additional props
 */
export default function withReduxFetch<T, U>(
  getRequestConfig: (props: T) => AxiosRequestConfig,
  selectorFunction: (state: any) => any,
  action: any,
  Component: React.FC<IFetcherComponentProps<U> & T>
) {
  return withFetch<T, U>(
    (props: T) =>
      useReduxFetch(getRequestConfig(props), selectorFunction, action),
    Component
  );
}
