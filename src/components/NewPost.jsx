import React from "react";

import { makeNewPost } from "../api";

//import "posts/setPosts" as prop, update state on fetch so all posts will be available on state
const NewPost = (props) => {
  const [posts, setPosts] = [props.posts, props.setPosts];

  return (
    <main>
      <h1>Make a new post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
        }}
      >
        <label>
          Post title:
          <input type="text" name="title" required={true}></input>
        </label>
        <label>
          Description:
          <input type="textarea" name="description" required={true}></input>
        </label>
        <label>
          Price:
          <input type="text" name="price" required={true}></input>
        </label>
        <label>
          Location:
          <input type="text" name="location" required={true}></input>
        </label>
        <label>
          Delivery available?
          <input type="checkbox" name="willDeliver"></input>
        </label>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default NewPost;
