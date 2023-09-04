"use client";
import { useState, ChangeEvent } from "react";

import "./signup.css";

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Timeout } from "../lib/timeout";

const firebaseConfig = {
  apiKey: "AIzaSyC1xSf41NuZdXi9Ex-gM6LUqvF_PK0u1uI",
  authDomain: "next-practice-f806e.firebaseapp.com",
  projectId: "next-practice-f806e",
  storageBucket: "next-practice-f806e.appspot.com",
  messagingSenderId: "935446946378",
  appId: "1:935446946378:web:772dad7adda9262d23bcb3",
  measurementId: "G-5BTR9RJFC3",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function Signup() {
  const [usernameSignupValue, setUsernameSignupValue] = useState<string>("");
  const [passwordSignupValue, setPasswordSignupValue] = useState<string>("");

  //Error states
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [userExistsError, setUserExistsError] = useState<boolean>(false);

  async function getAmountInQ() {
    let docRef = doc(db, "peopleInQ", "totalInQ");
    let docSnap = await getDoc(docRef);

    let data = docSnap.data();
    let inQ = data!.inQ;
    let newestUserName = data!.name;

    return [inQ, newestUserName];
  }

  async function postNewUser(userId: string, password: string) {
    if ((await checkIfUserExists(userId)) !== false) {
      Timeout(setUserExistsError, 1200);

      setUserExistsError(true);
      return;
    }

    await setDoc(doc(db, "userInformation", userId), {
      name: userId,
      password: password,
    });

    setLoggedIn();

    window.location.href = "/";
  }

  async function checkIfUserExists(userId: string) {
    const docRef = doc(db, "userInformation", userId);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    if (data === undefined) {
      return false;
    }

    return true;
  }

  async function setLoggedIn() {
    await setDoc(doc(db, "isLoggedIn", "isLoggedIn"), {
      loggedIn: true,
    });
  }

  async function getAllDocuments() {
    const querySnapshot = await getDocs(collection(db, "userInformation"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  function updateUsernameSignupValue(e: ChangeEvent<HTMLInputElement>) {
    setUsernameSignupValue(e.target.value);
  }

  function updatePasswordSignupValue(e: ChangeEvent<HTMLInputElement>) {
    setPasswordSignupValue(e.target.value);
  }

  function signUserUp() {
    if (usernameSignupValue === "") {
      Timeout(setUsernameError, 1200);

      setUsernameError(true);
      return;
    }

    if (passwordSignupValue === "") {
      Timeout(setPasswordError, 1200);

      setPasswordError(true);

      return;
    }

    postNewUser(usernameSignupValue, passwordSignupValue);
  }

  return (
    <div className="mainSignupContainer">
      <div className="mainSignup">
        <div className="mainSignupTop">
          {userExistsError ? (
            <h1 style={{ color: "red" }}>User already exists</h1>
          ) : (
            <h1>Signup</h1>
          )}
        </div>
        <div className="mainSignupContentContainer">
          <div className="mainSignupContent">
            <div className="usernameSignupContainer">
              <div className="usernameWrapper">
                {usernameError ? (
                  <label
                    htmlFor="username-label"
                    className="usernameFirstLabel"
                    style={{ color: "red" }}
                  >
                    Enter a username
                  </label>
                ) : (
                  <label htmlFor="username-label" className="usernameFirstLabel">
                    Username
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
                  <label
                    htmlFor="password-label"
                    className="passwordFirstLabel"
                    style={{ color: "red" }}
                  >
                    Enter a password
                  </label>
                ) : (
                  <label htmlFor="password-label" className="passwordFirstLabel">
                    Password
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
              <button className="signupPageBtn" onClick={() => signUserUp()}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
