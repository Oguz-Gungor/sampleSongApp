import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Card.scss"

/**
 * Card component to wrap contents with card view
 * @param props IWrapperComponent props
 * @returns Content wrapped with card view and style
 */
export default function Card(props: IWrapperComponent) {
  return <div className={`card ${props.className}`}>{props.children}</div>;
}
