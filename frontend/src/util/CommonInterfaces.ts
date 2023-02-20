import { AxiosRequestConfig } from "axios";
import React from "react";

/**
 * Common attributes for implemented components
 */
export interface IComponentProps {
  /**
   * css classname for wrapper element html in component
   */
  className?: string;
}

/**
 * Properties of fetcher component,i.e. components that are wrapped with withRequest higher order component
 */
export interface IFetcherComponentProps<T> extends JSX.IntrinsicAttributes{
   /**
   * response payload as fetcher component prop
   */
  payload: T | null;
  /**
   * post message config dispatcher to use corresponding post request with same payload as fetcher component prop
   */
  setPostConfig: React.Dispatch<
    React.SetStateAction<AxiosRequestConfig<any> | null>
  >;
}

/**
 * common attributes for implemented parent components
 */
export interface IWrapperComponent extends IComponentProps {
  children?: React.ReactNode;
}

/**
 * Common attributes for components with routing & directing content
 */
export interface ILinkProps extends IWrapperComponent {
  /**
   * link to be navigated to
   */
  link: string;
}
/**
 * Common attributes for form input components
 */
export interface IInputProps extends IComponentProps {
  /**
   * label of input component
   */
  label?: string;
  /**
   * key/id of input content
   */
  id?: string;
}

