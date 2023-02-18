import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ILinkProps } from "../../util/CommonInterfaces";

export default function RouteLink(props: ILinkProps) {
  const navigate = useNavigate();
  return (
    <span
      className={`route-link ${props.className}`}
      onClick={() => navigate(props.link)}
    >
      {props.children}
    </span>
  );
}
