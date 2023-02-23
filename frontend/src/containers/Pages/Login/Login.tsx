import * as React from "react";
import { getLoginConfig } from "../../../api/Auth";
import Card from "../../../components/Card/Card";
import Form from "../../../components/Input/Form";
import TextInput from "../../../components/Input/TextInput";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import {
  authHandler,
  ILoginStateStruct,
  useAuth,
} from "../../../util/CustomHooks";
import LabelConfig from "../../../config/LabelConfig.json";
import RouteConfig from "../../../config/RouteConfig.json";
import "./Login.scss";

/**
 * Login page container to display login form on screen
 * @returns Login page container
 */
export default function Login() {
  const { showLoader, setLoginStatus } = useAuth();
  return (
    <Page className="auth">
      <Card>
        {showLoader ? (
          <>...</>
        ) : (
          <>
            <div className="flex-column">
              <Form
                className="login-form"
                onSubmit={(data) => loginHandler(data, setLoginStatus)}
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
            <div className="flex-row button-container">
              <RouteLink link={RouteConfig.REGISTER}>
                {LabelConfig.REGISTER_LABEL}
              </RouteLink>
            </div>
          </>
        )}
      </Card>
    </Page>
  );
}

/**
 * Commit login request with given form data and set login status respect to REST response
 * @param data form data
 * @param setLoginStatus login status dispatcher
 */
const loginHandler = (
  data: any,
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  authHandler(setLoginStatus, getLoginConfig(data));
};
