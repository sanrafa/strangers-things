import React, { Fragment, useState, useEffect } from "react";
// import { BrowserRouter, Router, Link } from "react-router-dom";

import { registerNewUser } from "../api";

const Register = (props) => {
  const [user, setUser, token, setToken] = [
    props.user,
    props.setUser,
    props.token,
    props.setToken,
  ];

  const createAccount = () => {};

  return (
    <main>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted!");
        }}
      >
        <label>
          Username:
          <input type="text" name="username" required={true}></input>
        </label>
        <label>
          Password:
          <input type="password" name="password" required={true}></input>
        </label>

        <button type="submit">REGISTER</button>
      </form>
    </main>
  );
};

export default Register;
