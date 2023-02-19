import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getLoginConfig, validateTokenConfig } from "../../../api/Login";
import Card from "../../../components/Card/Card";
import Form from "../../../components/Input/Form";
import TextInput from "../../../components/Input/TextInput";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import { env } from "../../../util/tempConfig";
import { wrappedAxios } from "../../../util/UtilFunctions";
import "./Login.scss";

enum LoginStatus {
  CHECKING,
  INITIAL,
  PENDING,
  SUCCESS,
  FAIL,
}

interface ILoginStateStruct {
  status: LoginStatus;
  payload?: string;
}

export default function Login() {
  const [loginStatus, setLoginStatus] = React.useState<ILoginStateStruct>({
    status: LoginStatus.CHECKING,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.sessionStorage.getItem(env.TOKEN_KEY) == null) {
      setLoginStatus({ status: LoginStatus.INITIAL });
    } else {
      validateToken(setLoginStatus);
    }
  }, []);

  React.useEffect(() => {
    if (loginStatus.status === LoginStatus.SUCCESS) {
      navigate("/main");
    }
  }, [loginStatus.status]);

  const showLoader =
    loginStatus.status === LoginStatus.CHECKING ||
    loginStatus.status === LoginStatus.SUCCESS ||
    loginStatus.status === LoginStatus.PENDING;
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
                <TextInput label="username" id="username" />
                <TextInput label="password" id="password" />
              </Form>
            </div>
            <div className="flex-row button-container">
              <RouteLink link="/register">Register</RouteLink>
            </div>
          </>
        )}
      </Card>
    </Page>
  );
}

const loginHandler = (
  data: any,
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  handleLoginEvents(wrappedAxios(getLoginConfig(data)), setLoginStatus);
};

const validateToken = (
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  handleLoginEvents(wrappedAxios(validateTokenConfig), setLoginStatus);
};

const handleLoginEvents = (
  request: Promise<any>,
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  request
    .then((response) => {
      switch (response.status) {
        case 200:
          window.sessionStorage.setItem(env.TOKEN_KEY, response.data);
          setLoginStatus({ status: LoginStatus.SUCCESS });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
