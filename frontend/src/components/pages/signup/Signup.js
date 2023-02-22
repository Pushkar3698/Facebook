import React from "react";
import { FacebookLogo } from "../../resources/svg/FacebookLogo";
import "./Signup.css";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <div className="signup-container">
      <div className="facebook-header">
        <FacebookLogo classname={"fb-logo"} />
      </div>
      <div className="signup-form-container">
        <SignupForm />
      </div>
    </div>
  );
};
