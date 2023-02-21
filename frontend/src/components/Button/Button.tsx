import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";

/**
 * Button component to wrap content with html button functionality and style
 * @param props IWrapperComponent
 * @returns Content wrapped with style and utility
 */
export default function Button(props: IWrapperComponent) {
  return <button className={`button ${props.className}`}>{props.children}</button>;
}
