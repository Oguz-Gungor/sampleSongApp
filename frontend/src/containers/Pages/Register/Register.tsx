import * as React from "react";
import { getRegisterConfig } from "../../../api/Auth";
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
import "./Register.scss";

export default function Register() {
  const { showLoader, setLoginStatus } = useAuth();
  return (
    <Page className="auth">
      <Card>
        <Form
          className="register-form"
          onSubmit={(data) => registerHandler(data, setLoginStatus)}
        >
          <TextInput id="name" label={LabelConfig.AUTH_FORM_USERNAME_LABEL} />
          <TextInput id="email" label={LabelConfig.AUTH_FORM_EMAIL_LABEL} />
          <TextInput
            id="password"
            label={LabelConfig.AUTH_FORM_PASSWORD_LABEL}
          />
        </Form>
        <RouteLink link="/login">{LabelConfig.LOGIN_LABEL}</RouteLink>
      </Card>
    </Page>
  );
}

/**
 * Commit login request with given form data and set login status respect to REST response
 * @param data form data
 * @param setLoginStatus login status dispatcher
 */
const registerHandler = (
  data: any,
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  authHandler(setLoginStatus, getRegisterConfig(data));
};
