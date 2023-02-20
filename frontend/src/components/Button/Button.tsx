import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";

export default function Button(props: IWrapperComponent) {
  return <button className={`button ${props.className}`}>{props.children}</button>;
}
