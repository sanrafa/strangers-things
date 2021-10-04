import React, { useState, useEffect, createContext, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//API
import { fetchAllPosts, getLoggedInUser } from "./api";

//Components
import {
  Home,
  Login,
  Logout,
  Posts,
  Register,
  NewPost,
  UserProfile,
  SinglePostView,
} from "./components";

//Global context
export const UserContext = createContext();

const App = () => {
  //STATE
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    //if user selected "stay logged in" during last session, app authorizes them on page load
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getLoggedInUser(localStorage.getItem("token")).then((res) =>
        setActiveUser(res)
      );
    }
  }, []);

  useEffect(() => {
    const allPosts = fetchAllPosts(token);
    allPosts.then((res) => setPosts(res.data.posts));
  }, [JSON.stringify(posts)]); // since posts is an array of objects, it'll rerender everytime the variable is read

  return (
    <UserContext.Provider
      value={{ activeUser, setActiveUser, token, setToken }}
    >
      <Router>
        <Fragment>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              {activeUser && token ? (
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
              ) : null}
              {!activeUser || !token ? (
                <li>
                  <Link to="/register">Register</Link>
                </li>
              ) : null}
              {!activeUser || !token ? (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              ) : null}
              {activeUser && token ? (
                <li>
                  <Link to="/logout">Log Out</Link>
                </li>
              ) : null}
            </ul>
          </nav>
          <Switch>
            {/* Insert Routes for each page: register, login, profile, home, etc. */}
            <Route exact path="/posts/:postID/post">
              <SinglePostView posts={posts} />
            </Route>
            <Route path="/posts">
              <Posts posts={posts} setPosts={setPosts} />
            </Route>

            <Route path="/newpost">
              <NewPost posts={posts} setPosts={setPosts} />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/register">
              <Register
                user={user}
                setUser={setUser}
                pass={pass}
                setPass={setPass}
              />
            </Route>
            <Route path="/login">
              <Login
                user={user}
                setUser={setUser}
                pass={pass}
                setPass={setPass}
              />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
          </Switch>
        </Fragment>
      </Router>
    </UserContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
