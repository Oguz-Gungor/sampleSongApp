import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ILinkProps } from "../../util/CommonInterfaces";

export interface IRoutLinkProps extends ILinkProps {
  callback?: () => void;
}

export default function RouteLink(props: IRoutLinkProps) {
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
