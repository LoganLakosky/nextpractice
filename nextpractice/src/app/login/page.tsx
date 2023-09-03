"use client"

import "./login.css";

import { ChangeEvent, useState } from "react";

import { Timeout } from "../lib/timeout";

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
      Timeout(setUsernameError, 1200);

      setUsernameError(true);

      return;
    }

    if (passwordLoginValue === "") {
      Timeout(setPasswordError, 1200);

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
                  <label htmlFor="username-label" style={{ color: "red", marginBottom: "4px" }}>
                    enter a username
                  </label>
                ) : (
                  <label htmlFor="username-label" className="usernameFirstLabel">
                    Username
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
                  <label
                    htmlFor="password-label"
                    className="passwordFirstLabel"
                    style={{ color: "red" }}
                  >
                    Please enter a password
                  </label>
                ) : (
                  <label htmlFor="password-label" className="passwordFirstLabel">
                    Password
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
