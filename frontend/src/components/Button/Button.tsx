import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Button.scss"

/**
 * Prop attributes of wrapped Button component
 */
interface IButtonComponent extends IWrapperComponent {
  onClick?: () => void;
  onMouseOver?:()=>void;
  onMouseLeave?: ()=>void;
}

/**
 * Button component to wrap content with html button functionality and style
 * @param props IWrapperComponent
 * @returns Content wrapped with style and utility
 */
export default function Button(props: IButtonComponent) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
      {props.children}
    </button>
  );
}
