import * as React from "react";
import {
  IAuthContainerProps,
} from "../CommonInterfaces";
import LabelConfig from "../../config/LabelConfig.json";
import { authHandler, useAuth } from "../CustomHooks";
import { AxiosRequestConfig } from "axios";
import "./withAuth.scss"

/**
 * Higher order component to wrap Authorization containers with authorization cycle internals with given parameters
 * @param fetchHook fetch hook to handle request
 * @param Component wrapped component
 * @returns
 */
export default function withAuth<T>(
  requestConfigGenerator: (data: any) => AxiosRequestConfig,
  Component: React.FC<IAuthContainerProps>
) {
  return (props: T) => {
    //Authorization cycle internals
    const { showLoader, setLoginStatus } = useAuth();
    //View for loading state
    if (showLoader) {
      return <>{LabelConfig.LOADING_LABEL}...</>;
    }
    //Wrapped component as view on response receive with payload
    return (
      <Component
        {...{
          ...props,
          className: `auth`,
          onSubmit: (data: any) =>
            authHandler(setLoginStatus, requestConfigGenerator(data)),
        }}
      />
    );
  };
}
