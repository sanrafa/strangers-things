import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <main>
      <h1>Welcome to Stranger's Things!</h1>
      <Link to="/posts">View active posts</Link>
    </main>
  );
};

export default Home;
