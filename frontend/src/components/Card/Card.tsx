import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Card.scss"

export default function Card(props: IWrapperComponent) {
  return <div className={`card ${props.className}`}>{props.children}</div>;
}
