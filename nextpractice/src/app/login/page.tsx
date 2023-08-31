"use client";

import "./login.css";

import { ChangeEvent, useState } from "react";

export default function Login() {
  const [usernameLoginValue, setUsernameLoginValue] = useState<string>("");
  const [passwordLoginValue, setPasswordLoginValue] = useState<string>("");

  //Error states
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  function updateUsernameLoginValue(e: ChangeEvent<HTMLInputElement>) {
    setUsernameLoginValue(e.target.value);
  }

  function updatePasswordLoginValue(e: ChangeEvent<HTMLInputElement>) {
    setPasswordLoginValue(e.target.value);
  }

  async function logUserIn() {
    if (usernameLoginValue === "") {
      setTimeout(() => {
        setUsernameError(false);
      }, 1200);

      setUsernameError(true);

      return;
    }

    if (passwordLoginValue === "") {
      setTimeout(() => {
        setPasswordError(false);
      }, 1200);

      setPasswordError(true);
      return;
    }
  }

  return (
    <div className="mainLoginContainer">
      <div className="mainLogin">
        <div className="mainLoginTop">
          <h1>Login</h1>
        </div>
        <div className="mainLoginContentContainer">
          <div className="mainLoginContent">
            <div className="usernameInputContainer">
              <div className="usernameWrapper">
                {usernameError ? (
                  <label htmlFor="username-label" className="usernameFirstLabel">
                    Username
                  </label>
                ) : (
                  <label htmlFor="username-label" style={{ color: "red", marginBottom: "4px" }}>
                    enter a username
                  </label>
                )}

                <input
                  value={usernameLoginValue}
                  type="text"
                  id="username-label"
                  onChange={updateUsernameLoginValue}
                />
              </div>
            </div>
            <div className="passwordInputContainer">
              <div className="passwordWrapper">
                {passwordError ? (
                  <label htmlFor="password-label" className="passwordFirstLabel">
                    Password
                  </label>
                ) : (
                  <label htmlFor="password-label" className="passwordFirstLabel">
                    Please enter a password
                  </label>
                )}
                <input
                  value={passwordLoginValue}
                  type="text"
                  id="password-label"
                  onChange={updatePasswordLoginValue}
                />
              </div>
            </div>
            <div className="loginPageBtnContainer">
              <button className="loginPageBtn" onClick={() => logUserIn()}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
