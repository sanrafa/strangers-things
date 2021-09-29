import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, Link } from "react-router-dom";

//API
import { API_URL, fetchAllPosts } from "./api";

//Components
import { Posts } from "./components";

const App = () => {
  //STATE
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const allPosts = fetchAllPosts(API_URL);
    allPosts.then((res) => setPosts(res.data.posts));
  }, []);

  return (
    <div>
      <h1>Stranger's Things</h1>
      <Posts posts={posts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
