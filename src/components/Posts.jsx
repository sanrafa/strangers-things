import React, { useContext, Fragment, useState, useEffect } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { FeaturedPost } from ".";

import { UserContext } from "..";

import { deletePost } from "../api";

const Posts = (props) => {
  let match = useRouteMatch();
  const [posts, setPosts] = [props.posts, props.setPosts];

  const { token, activeUser } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = (search, postStr) => {
    function escRegEx(str) {
      return str.replace(/[-\\^$*+?.()|[\]{}]/g, "");
    }
    const escapedTerm = escRegEx(search);
    const regex = new RegExp(escapedTerm, "gi");
    return regex.test(postStr);
  };

  useEffect(() => {
    const searchPosts = posts.filter(
      (post) =>
        handleSearch(searchTerm, post.title) ||
        handleSearch(searchTerm, post.description)
    );
    setFilteredPosts(searchPosts);
  }, [searchTerm]);

  return (
    <Fragment>
      <section>
        <h1>Posts</h1>
        <Link to="/newpost">Create new post</Link>
        <form>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </form>
        {posts && !(filteredPosts.length > 0)
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
                  <Link to={`/posts/${post._id}`}>Send a message</Link>
                ) : null}
                <Link to={`/posts/${post._id}/post`}>View post</Link>
              </div>
            ))
          : posts && filteredPosts.length > 0
          ? filteredPosts.map((post) => (
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
                  <Link to={`/posts/${post._id}`}>Send a message</Link>
                ) : null}
                <Link to={`/posts/${post._id}/post`}>View post</Link>
              </div>
            ))
          : null}
      </section>

      <Route exact path={`${match.path}/:postID`}>
        <FeaturedPost posts={posts} />
      </Route>
    </Fragment>
  );
};

export default Posts;
