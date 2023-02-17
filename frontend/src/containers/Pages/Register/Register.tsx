import * as React from "react";
import Card from "../../../components/Card/Card";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";

export default function Register() {
  return (
    <Page className="auth">
      <Card>
        Register <RouteLink link="/login">Login</RouteLink>
      </Card>
    </Page>
  );
}
