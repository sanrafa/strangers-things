import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "..";

import { deletePost } from "../api";

const Posts = (props) => {
  const [posts, setPosts] = [props.posts, props.setPosts];

  const { token, activeUser } = useContext(UserContext);

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
                  onClick={() =>
                    deletePost(post._id, token).then(() => {
                      const activePosts = posts.filter(
                        (post) => post.active === true
                      );
                      setPosts(activePosts);
                    })
                  }
                >
                  DELETE
                </button>
              ) : null}
              {activeUser && !post.isAuthor ? (
                <button type="button" onClick={() => console.log("clicked")}>
                  SEND A MESSAGE
                </button>
              ) : null}
            </div>
          ))
        : null}
      <Link to="/newpost">Create new post</Link>
    </section>
  );
};

export default Posts;
