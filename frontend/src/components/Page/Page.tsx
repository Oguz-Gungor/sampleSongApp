import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Page.scss";


/**
 * Wrapper component for page content
 * @param props classname to specify page content style and children to render content
 * @returns wrapped styled page content
 */
export default function Page(props: IWrapperComponent) {
  return <div className={`page ${props.className}`}>
        {props.children}
    </div>;
}
