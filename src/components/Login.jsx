import React, { Fragment, useState, useEffect } from "react";
// import { BrowserRouter, Router, Link } from "react-router-dom";

import { loginUser, API_URL } from "../api";

const Login = (props) => {
  const [user, setUser, token, setToken, pass, setPass] = [
    props.user,
    props.setUser,
    props.token,
    props.setToken,
    props.pass,
    props.setPass,
  ];

  const accessAccount = () => {
    loginUser(API_URL, user, pass).then((res) => setToken(res.data.token));
  };

  return (
    <main>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          accessAccount();
        }}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            required={true}
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
