import React, { useEffect } from "react";
import AppPaths from "../../chat_lib/appPaths";
import Constants from "../../chat_lib/constants";
import CookieUtil from "../../util/cookieUtil";
import { useNavigate } from 'react-router-dom';

const AuthRequired = (Component) => {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate(); // Use the custom hook to get navigate function

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = () => {
      if (!CookieUtil.getCookie(Constants.ACCESS_PROPERTY)) {
        // Navigate the user to the login page if not authenticated
        navigate(AppPaths.LOGIN);
      }
    };

    // Render the component only if authenticated
    return CookieUtil.getCookie(Constants.ACCESS_PROPERTY) ? (
      <Component {...props} />
    ) : null;
  };
};

export default AuthRequired;
