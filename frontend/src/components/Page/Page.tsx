import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Page.scss";


export default function Page(props: IWrapperComponent) {
  return <div className={`page ${props.className}`}>
        {props.children}
    </div>;
}
