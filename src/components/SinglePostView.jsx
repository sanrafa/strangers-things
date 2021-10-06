import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "..";
import { sendMessage } from "../api";

const SinglePostView = (props) => {
  const { postID } = useParams();
  const { token } = useContext(UserContext);
  const posts = props.posts;

  const [post, setPost] = useState({});
  const [message, setMessage] = useState("");
  const [msgSent, setMsgSent] = useState(false);

  useEffect(() => {
    const thisPost = posts.filter((ele) => ele._id === postID);
    setPost(thisPost[0]);
  }, [postID, posts]);

  return (
    <section>
      <Link to="/posts">Return to all posts</Link>
      {post && post.isAuthor ? (
        <Link to={`/posts/${postID}/edit`}>Edit this post</Link>
      ) : null}

      <h1>{post ? post.title : null}</h1>
      <p>
        <strong>Price:</strong> {post ? post.price : null}
      </p>
      <p>
        <strong>Delivery available?</strong>
        {post && post.willDeliver ? " yes" : " none"}
      </p>
      <p>
        <strong>Location:</strong> {post ? post.location : null}
      </p>
      <p>{post ? post.description : null}</p>
      {/* Message form will show if user is not author */}
      {post && !post.isAuthor && token ? <h2>SEND A MESSAGE</h2> : null}
      {post && !msgSent && !post.isAuthor && token ? (
        <Fragment>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(postID, token, message).then(() => {
                setMsgSent(!msgSent);
                setMessage("");
              });
            }}
          >
            <label>
              Message:
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </label>
            <button type="submit">SUBMIT</button>
          </form>
        </Fragment>
      ) : null}
      {post && !post.isAuthor && msgSent ? (
        <p>
          <em>Your message has been sent</em>
        </p>
      ) : null}
      {/* Message pane will show if user is author */}
      {post && post.isAuthor ? (
        <div>
          <h2>Messages</h2>
          {post.messages.map((msg) => (
            <div key={msg._id}>
              <h3>From: {msg.fromUser.username}</h3>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default SinglePostView;
