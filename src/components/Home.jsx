import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "..";

const Home = (props) => {
  const { activeUser, token } = useContext(UserContext);
  return (
    <main>
      <h1>Welcome to Stranger's Things!</h1>
      <Link to="/posts">View active posts</Link>
      {/* Import context, only show add new post if user is logged in */}
      {activeUser && token ? <Link to="/newpost">Add a new post</Link> : null}
    </main>
  );
};

export default Home;
