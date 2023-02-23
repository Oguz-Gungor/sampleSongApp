import * as React from "react";
import { getLoginConfig } from "../../../api/Auth";
import Card from "../../../components/Card/Card";
import Form from "../../../components/Input/Form";
import TextInput from "../../../components/Input/TextInput";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import LabelConfig from "../../../config/LabelConfig.json";
import RouteConfig from "../../../config/RouteConfig.json";
import withAuth from "../../../util/hocs/withAuth";
import { IAuthContainerProps } from "../../../util/CommonInterfaces";

/**
 * Login page container to display login form on screen
 * @returns Login page container
 */
function Login(props: IAuthContainerProps) {
  return (
    <Page className={`login ${props.className}`}>
      <Card>
        <div className="flex-column">
          <Form
            className="login-form"
            onSubmit={props.onSubmit}
            submitButtonLabel={LabelConfig.LOGIN_LABEL}
            requiredAttributes={["username", "password"]}
            secondaryButton={
              <RouteLink link={RouteConfig.REGISTER} className="route-link">
                {LabelConfig.REGISTER_LABEL + " Page"}
              </RouteLink>
            }
          >
            <TextInput
              label="username"
              id={LabelConfig.AUTH_FORM_USERNAME_LABEL}
            />
            <TextInput
              label="password"
              id={LabelConfig.AUTH_FORM_PASSWORD_LABEL}
            />
          </Form>
        </div>
      </Card>
    </Page>
  );
}

/**
 * Login page container to display login form on screen via withAuth logic
 */
//export table inside withAuth higher order component to give onSubmit function to component and handle authorization cycle with given request config via hoc
export default withAuth(getLoginConfig, Login);
