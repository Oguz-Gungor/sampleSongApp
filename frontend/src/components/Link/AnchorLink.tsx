import * as React from "react";
import { ILinkProps } from "../../util/CommonInterfaces";



export default function AnchorLink(props: ILinkProps) {
  return <a href={`#${props.link}`}>{props.children}</a>;
}
