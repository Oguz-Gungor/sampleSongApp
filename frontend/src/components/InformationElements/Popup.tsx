import * as Reacft from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Popup.scss";

export default function Popup(props: IWrapperComponent) {
  return (
    <div className={`popup flex-column ${props.className}`}>
      {props.children}
    </div>
  );
}
