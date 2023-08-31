"use client";
import { useState, ChangeEvent } from "react";

import "./signup.css";

export default function Signup() {
  const [usernameSignupValue, setUsernameSignupValue] = useState<string>("");
  const [passwordSignupValue, setPasswordSignupValue] = useState<string>("");

  //Error states
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordErorr] = useState<boolean>(false);

  function updateUsernameSignupValue(e: ChangeEvent<HTMLInputElement>) {
    setUsernameSignupValue(e.target.value);
  }

  function updatePasswordSignupValue(e: ChangeEvent<HTMLInputElement>) {
    setPasswordSignupValue(e.target.value);
  }

  function signUserUp() {
    if (usernameSignupValue === "") {
      setTimeout(() => {
        setUsernameError(false);
      }, 1200);
      setUsernameError(true);
      return;
    }

    if (passwordSignupValue === "") {
      setTimeout(() => {
        setPasswordErorr(false);
      });
      setPasswordErorr(true);
      return;
    }
  }

  return (
    <div className="mainSignupContainer">
      <div className="mainSignup">
        <div className="mainSignupTop">
          <h1>Signup</h1>
        </div>
        <div className="mainSignupContentContainer">
          <div className="mainSignupContent">
            <div className="usernameSignupContainer">
              <div className="usernameWrapper">
                {usernameError ? (
                  <label htmlFor="username-label" className="usernameFirstLabel">
                    Username
                  </label>
                ) : (
                  <label
                    htmlFor="username-label"
                    className="usernameFirstLabel"
                    style={{ color: "red" }}
                  >
                    Enter a username
                  </label>
                )}
                <input
                  value={usernameSignupValue}
                  type="text"
                  id="username-label"
                  onChange={updateUsernameSignupValue}
                />
              </div>
            </div>
            <div className="passwordSignupContainer">
              <div className="passwordWrapper">
                {passwordError ? (
                  <label htmlFor="password-label" className="passwordFirstLabel">
                    Password
                  </label>
                ) : (
                  <label
                    htmlFor="password-label"
                    className="passwordFirstLabel"
                    style={{ color: "red" }}
                  >
                    Enter a password
                  </label>
                )}
                <input
                  value={passwordSignupValue}
                  type="text"
                  id="password-label"
                  onChange={updatePasswordSignupValue}
                />
              </div>
            </div>
            <div className="signupPageBtnContainer">
              <button className="signupPageBtn">Signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
