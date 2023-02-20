import { AxiosRequestConfig } from "axios";
import * as React from "react";
import { IFetcherComponentProps } from "../CommonInterfaces";
import { useLocalFetch } from "../CustomHooks";

/**
 * Higher order component to wrap component with request cycle internals with react states
 * @param getRequestConfig axios request config
 * @param Component component to be wrapped
 * @returns wrapped component with request cycle internals as additional props
 */
export default function withFetch<T, U>(
  fetchHook: any,
  Component: React.FC<IFetcherComponentProps<U>>
) {
  return (props: T) => {
    // Request cycle internals
    const { payload, isLoading, error, setPostConfig } = fetchHook(props);
    //View for loading state
    if (isLoading) {
      return <>Loading...</>;
    }
    //View for error state
    if (error) {
      return <>Error</>;
    }
    //Wrapped component as view on response receive with payload
    return <Component {...{ ...props, payload, setPostConfig }} />;
  };
}
