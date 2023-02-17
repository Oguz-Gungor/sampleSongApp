import * as React from "react";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import "./MainPanel.scss"

export default function MainPanel() {
  return (
    <Page className="main">
      asd
      <RouteLink link="/login">logout</RouteLink>
    </Page>
  );
}
