import "./signup.css"

export default function Signup() {
  return<div className="mainSignupContainer">
  <div className="mainSignup">
    <div className="mainSignupTop">
      <h1>Signup</h1>
    </div>
    <div className="mainSignupContentContainer">
          <div className="mainSignupContent">
            <div className="usernameSignupContainer">
              <div className="usernameWrapper">
                <label htmlFor="username-label" className="usernameFirstLabel">
                  Username
                </label>
                <input type="text" id="username-label" />
              </div>
            </div>
            <div className="passwordSignupContainer">
              <div className="passwordWrapper">
                <label htmlFor="password-label" className="passwordFirstLabel">
                  Password
                </label>
                <input type="text" id="password-label" />
              </div>
            </div>
            <div className="signupPageBtnContainer">
                <button className="signupPageBtn">Login</button>
            </div>
          </div>
        </div>
  </div>
</div>
}
