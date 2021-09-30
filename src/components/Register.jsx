import React, { Fragment, useState, useEffect } from "react";
// import { BrowserRouter, Router, Link } from "react-router-dom";

import { registerNewUser, API_URL } from "../api";

const Register = (props) => {
  const [user, setUser, token, setToken, pass, setPass] = [
    props.user,
    props.setUser,
    props.token,
    props.setToken,
    props.pass,
    props.setPass,
  ];

  const createAccount = () => {
    registerNewUser(API_URL, user, pass).then((res) =>
      setToken(res.data.token)
    );
    // add token to session storage?
  };

  return (
    <main>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createAccount();
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

        <button type="submit">REGISTER</button>
      </form>
    </main>
  );
};

export default Register;
