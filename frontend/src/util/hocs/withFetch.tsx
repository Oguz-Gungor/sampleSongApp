import { AxiosRequestConfig } from "axios";
import * as React from "react";
import { IFetcherComponentProps } from "../CommonInterfaces";
import LabelConfig from "../../config/LabelConfig.json";

/**
 * Higher order component to wrap component with request cycle internals with given custom fetch hooks
 * @param fetchHook fetch hook to handle request
 * @param Component wrapped component
 * @returns
 */
export default function withFetch<T, U>(
  fetchHook: any,
  Component: React.FC<IFetcherComponentProps<U> & T>
) {
  return (props: T) => {
    // Request cycle internals
    const { payload, isLoading, error, setPostConfig } = fetchHook(props);
    //View for loading state
    if (isLoading) {
      return <>{LabelConfig.LOADING_LABEL}...</>;
    }
    //View for error state
    if (error) {
      return <>{LabelConfig.ERROR_LABEL}</>;
    }
    //Wrapped component as view on response receive with payload
    return <Component {...{ ...props, payload, setPostConfig }} />;
  };
}
