import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Router, Link } from "react-router-dom";

const Posts = (props) => {
  const posts = props.posts;
  return (
    <section>
      <h1>Posts</h1>
      {posts
        ? posts.map((post) => (
            <div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))
        : null}
    </section>
  );
};

export default Posts;
