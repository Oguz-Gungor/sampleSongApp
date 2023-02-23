import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ILinkProps } from "../../util/CommonInterfaces";
import "./RouteLink.scss"

/**
 * Route link props additional to link props   
 */
export interface IRouteLinkProps extends ILinkProps {
  /**
   * optinal callback to be handled on click
   */
  callback?: () => void;
}

/**
 * Application route link component to generate a content wrapped with hash link functionality
 * @param props Application route link to be routed on click, classname of link component, callback to be handled on click and link content as children
 * @returns Application route link content wrapped with utility and style
 */
export default function RouteLink(props: IRouteLinkProps) {
  const navigate = useNavigate();
  return (
    <span
      className={`route-link ${props.className}`}
      onClick={() => {
        if (props.callback) {
          props.callback();
        }
        navigate(props.link);
      }}
    >
      {props.children}
    </span>
  );
}
