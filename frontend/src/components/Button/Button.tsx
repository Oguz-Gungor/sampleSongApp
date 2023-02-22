import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Button.scss"

interface IButtonComponent extends IWrapperComponent {
  onClick?: () => void;
}

/**
 * Button component to wrap content with html button functionality and style
 * @param props IWrapperComponent
 * @returns Content wrapped with style and utility
 */
export default function Button(props: IButtonComponent) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
