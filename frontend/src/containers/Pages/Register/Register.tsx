import * as React from "react";
import { getRegisterConfig } from "../../../api/Auth";
import Card from "../../../components/Card/Card";
import Form from "../../../components/Input/Form";
import TextInput from "../../../components/Input/TextInput";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import LabelConfig from "../../../config/LabelConfig.json";
import { IAuthContainerProps } from "../../../util/CommonInterfaces";
import withAuth from "../../../util/hocs/withAuth";

/**
 * Register page container to display register form on screen
 * @returns Login page container
 */
function Register(props: IAuthContainerProps) {
  return (
    <Page className="auth">
      <Card>
        <Form
          className="register-form"
          onSubmit={props.onSubmit}
          submitButtonLabel={LabelConfig.REGISTER_LABEL}
          requiredAttributes={["name","email","password"]}
          secondaryButton={
            <RouteLink link="/login" className="route-link">
              {LabelConfig.LOGIN_LABEL + " Page"}
            </RouteLink>
          }
        >
          <TextInput id="name" label={LabelConfig.AUTH_FORM_USERNAME_LABEL} />
          <TextInput id="email" label={LabelConfig.AUTH_FORM_EMAIL_LABEL} />
          <TextInput
            id="password"
            label={LabelConfig.AUTH_FORM_PASSWORD_LABEL}
          />
        </Form>
      </Card>
    </Page>
  );
}

/**
 * Register page container to display register form on screen via withAuth logic
 */
//export table inside withAuth higher order component to give onSubmit function to component and handle authorization cycle with given request config via hoc
export default withAuth(getRegisterConfig, Register);
