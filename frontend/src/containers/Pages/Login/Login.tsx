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

/**
 * Possible authorization states
 */
enum LoginStatus {
  CHECKING,
  INITIAL,
  PENDING,
  SUCCESS,
  FAIL,
}

/**
 * Login container authentication status structure
 */
interface ILoginStateStruct {
  /**
   * authentication status for login container
   */
  status: LoginStatus;
}

/**
 * Login page container to display login form on screen
 * @returns Login page container
 */
export default function Login() {
  /**
   * state and dispatcher to contain current authentication status
   */
  const [loginStatus, setLoginStatus] = React.useState<ILoginStateStruct>({
    status: LoginStatus.CHECKING,
  });

  const navigate = useNavigate();

  /**
   * If auth token exists on container load, validate existing token. Else, set current status as INITIAL(Unauthenticated)
   */
  React.useEffect(() => {
    if (window.sessionStorage.getItem(env.TOKEN_KEY) == null) {
      setLoginStatus({ status: LoginStatus.INITIAL });
    } else {
      validateToken(setLoginStatus);
    }
  }, []);

  /**
   * If login status changed to success, opens main container
   */
  React.useEffect(() => {
    if (loginStatus.status === LoginStatus.SUCCESS) {
      navigate("/main");
    }
  }, [loginStatus.status]);

  /**
   * variable to state whether loader should be shown or not
   */
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

/**
 * Commit login request with given form data and set login status respect to REST response
 * @param data form data
 * @param setLoginStatus login status dispatcher
 */
const loginHandler = (
  data: any,
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  handleLoginEvents(wrappedAxios(getLoginConfig(data)), setLoginStatus);
};

/**
 * Commit validation request to validate existing token and set login status respect to validation result
 * @param setLoginStatus login status dispatcher
 */
const validateToken = (
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStateStruct>>
) => {
  handleLoginEvents(wrappedAxios(validateTokenConfig), setLoginStatus);
};

/**
 * To handle login related response and set current authentication status accordingly
 * @param request axios request config for request to be comitted
 * @param setLoginStatus login status dispatcher
 */
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
