import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
//pages
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Confirm from "./components/Auth/Confirm";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/Nav/Sidebar";
import Home from "./components/Home/Home";
import MyPosts from "./components/MyPosts/MyPosts";
import MyFavourites from "./components/MyFavourites/MyFavourites";
import PostOnMap from "./components/MyFavourites/PostOnMap";
import Messages from "./components/messages/Messages";
import AddMessage from "./components/messages/AddMessage";
import HowTo from "./components/How-To/HowTo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.user,
      postAddedCount: 0,
    };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  postAddedHandler = () => {
    this.setState({
      postAddedCount: this.state.postAddedCount + 1,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedInUser !== null ? (
          <Sidebar
            getUser={this.getTheUser}
            postAdded={this.postAddedHandler}
          />
        ) : null}
        <Switch>
          <Route exact path="/confirm/:id" component={Confirm} />
          <Route
            exact
            path="/"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/how-to"></Redirect>;
              } else {
                return (
                  <Signup
                    history={this.props.history}
                    getUser={this.getTheUser}
                  />
                );
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
            path="/how-to"
            render={() => {
              if (this.state.loggedInUser) {
                return <HowTo 
                getUser={this.getTheUser}
                />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          ></Route>
          <Route
            exact
            path="/home"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <Home
                    key={this.state.postAddedCount} // force re/renders Home if post has been added
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          ></Route>
          <Route
            exact
            path="/profile"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <Profile
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/my-posts"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <MyPosts
                    key={this.state.postAddedCount}
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/favourites"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <MyFavourites
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/posts/:id"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <PostOnMap
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/messages"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <Messages
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/messages/new-message/:id"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <AddMessage
                    getUser={this.getTheUser}
                    userData={this.state.loggedInUser}
                  />
                );
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
