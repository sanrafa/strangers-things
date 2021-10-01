import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter, Router, Link } from "react-router-dom";

import { UserContext } from "..";
import { loginUser, API_URL } from "../api";

const Login = (props) => {
  const [user, setUser, pass, setPass] = [
    props.user,
    props.setUser,
    props.pass,
    props.setPass,
  ];

  const { activeUser, setActiveUser, token, setToken } =
    useContext(UserContext);

  //state for login preferences
  const [persistLogin, setPersistLogin] = useState(false);

  useEffect(() => {
    if (persistLogin) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  }, [token]);

  const accessAccount = () => {
    loginUser(API_URL, user, pass).then((res) => {
      setActiveUser(user);
      setToken(res.data.token);
    });
  };

  return (
    <main>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          accessAccount();
          // TODO: if persistLogin=true, save token to localStorage, otherwise to sessionStorage
          setUser("");
          setPass("");
        }}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            required={true}
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required={true}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Stay logged in?
          <input
            type="checkbox"
            name="stayLoggedIn"
            value="stayLoggedIn"
            onClick={() => {
              setPersistLogin(!persistLogin);
            }}
          ></input>
        </label>

        <button type="submit">LOG IN</button>
      </form>
    </main>
  );
};

export default Login;
