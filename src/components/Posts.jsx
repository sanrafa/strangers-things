import React, { useContext } from "react";
// import { BrowserRouter, Router, Link } from "react-router-dom";

import { UserContext } from "..";

import { deletePost } from "../api";

const Posts = (props) => {
  const posts = props.posts;

  const { token } = useContext(UserContext);

  return (
    <section>
      <h1>Posts</h1>
      {posts
        ? posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              {post.isAuthor === true ? (
                <button
                  type="button"
                  onClick={() => deletePost(post._id, token)}
                >
                  DELETE
                </button>
              ) : null}
            </div>
          ))
        : null}
    </section>
  );
};

export default Posts;
