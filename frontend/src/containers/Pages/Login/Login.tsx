import * as React from "react";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import TextInput from "../../../components/Input/TextInput";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";

export default function Login() {
  return (
    <Page className="auth">
      <Card>
        <div className="flex-column">
          <TextInput label="username"/>
          <TextInput label="password" />
        </div>
        <div className="flex-row button-container">
          <RouteLink link="/register">Register</RouteLink>
          <RouteLink link="/main">
            <Button>Login</Button>
          </RouteLink>
        </div>
      </Card>
    </Page>
  );
}
