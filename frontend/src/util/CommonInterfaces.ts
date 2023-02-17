import React from "react";

export interface IComponentProps {
  className?: string;
}

export interface IWrapperComponent extends IComponentProps {
  children?: React.ReactNode;
}

export interface ILinkProps extends IWrapperComponent {
  link: string;
}

export interface IInputProps extends IComponentProps {
  label?: string;
}

export interface IFetchStruct<T> {
  error: boolean;
  loading: boolean;
  payload: T;
}
