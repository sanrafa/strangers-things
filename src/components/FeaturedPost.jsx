import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "..";

const FeaturedPost = (props) => {
  const { postID } = useParams();
  const { token } = useContext(UserContext);
  const posts = props.posts;

  const [featuredPost, setFeaturedPost] = useState({});

  useEffect(() => {
    const thisPost = posts.filter((post) => post._id === postID);
    setFeaturedPost(thisPost[0]);
  }, [postID]);

  return (
    <aside>
      <h1>{featuredPost ? featuredPost.title : null}</h1>
      <p>{featuredPost ? featuredPost.description : null}</p>
      {featuredPost && !featuredPost.isAuthor ? (
        <form>
          <label>
            Message:
            <textarea name="message"></textarea>
          </label>
          <button type="submit">SEND MESSAGE</button>
        </form>
      ) : null}
    </aside>
  ); // use aside element, use flex row for styling
};

export default FeaturedPost;
