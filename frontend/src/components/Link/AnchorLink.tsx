import * as React from "react";
import { ILinkProps } from "../../util/CommonInterfaces";


/**
 * Hashlink component to generate a content wrapped with hash link functionality
 * @param props hash link to be routed on click, classname of link component and link content as children
 * @returns Hash link content wrapped with utility and style
 */
export default function AnchorLink(props: ILinkProps) {
  return <a href={`#${props.link}`} className={`route-link ${props.className}`}>{props.children}</a>;
}
