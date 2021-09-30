import React, { Fragment, useState, useEffect, useContext } from "react";
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

        <button type="submit">LOG IN</button>
      </form>
    </main>
  );
};

export default Login;
