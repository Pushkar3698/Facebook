import React from "react";
import { FacebookLogo } from "../../resources/svg/FacebookLogo";

import "../login/Login.css";
import { LoginForm } from "./LoginForm";

export const Login = ({ setUserLogin, setUserLogout }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <FacebookLogo classname={"fb-login-svg"} />
        <LoginForm setUserLogin={setUserLogin} setUserLogout={setUserLogout} />
      </div>
    </div>
  );
};
