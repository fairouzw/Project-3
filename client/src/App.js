import React, { Component } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css";

//pages
import Start from "./components/Auth/Start";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/Nav/Sidebar";
import Home from "./components/Home/Home";
import MyPosts from "./components/MyPosts/MyPosts";
import MyFavourites from "./components/MyFavourites/MyFavourites";
import PostOnMap from "./components/MyFavourites/PostOnMap";
import Messages from "./components/messages/Messages";
import AddMessage from "./components/messages/AddMessage"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.user,
      postAddedCount: 0
    };
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  postAddedHandler = () => {
    this.setState({
      postAddedCount: this.state.postAddedCount + 1
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedInUser !== null ? (
          <Sidebar getUser={this.getTheUser} postAdded={this.postAddedHandler} />
        ) : null}
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (this.state.loggedInUser === null) {
                return <Start />;
              }
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/home"></Redirect>;
              } else {
                return <Login getUser={this.getTheUser} />;
              }
            }}
          ></Route>
          <Route
            exact
            path="/signup"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/home"></Redirect>;
              } else {
                return (
                  <Signup
                    history={this.props.history}
                    getUser={this.getTheUser}
                  />
                );
              }
            }}
          ></Route>
          <Route
            exact
            path="/home"
            render={() => (

              <Home
                key={this.state.postAddedCount} // force re/renders Home if post has been added
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />

            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (

              <Profile
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />

            )}
          />
          <Route
            exact
            path="/my-posts"
            render={() => (
              <MyPosts
                key={this.state.postAddedCount}
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />

            )}
          />
          <Route
            exact
            path="/favourites"
            render={() => (
              <MyFavourites
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />
            )}
          />
          <Route exact path="/posts/:id" render={() => (
            <PostOnMap
              getUser={this.getTheUser}
              userData={this.state.loggedInUser}
            />
          )} />
          <Route
            exact
            path="/messages"
            render={() => (
              <Messages
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />

            )}
          />
          <Route
            exact
            path="/messages/new-message/:id"
            render={() => (
              <AddMessage
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />

            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
