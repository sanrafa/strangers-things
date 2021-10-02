import React, { useContext, Fragment } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { FeaturedPost } from ".";

import { UserContext } from "..";

import { deletePost } from "../api";

const Posts = (props) => {
  let match = useRouteMatch();
  const [posts, setPosts] = [props.posts, props.setPosts];

  const { token, activeUser } = useContext(UserContext);

  return (
    <Fragment>
      <section>
        <h1>Posts</h1>
        <Link to="/newpost">Create new post</Link>
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
                <Link to={`/posts/${post._id}`}>View post</Link>
              </div>
            ))
          : null}
      </section>
      <Switch>
        <Route path={`${match.path}/:postID`}>
          <FeaturedPost posts={posts} />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Posts;
