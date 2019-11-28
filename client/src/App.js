import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

//pages
import Start from "./components/Start";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import MyPosts from "./components/MyPosts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.user
    };
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedInUser !== null ? (
          <Sidebar getUser={this.getTheUser} />
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
                getUser={this.getTheUser}
                userData={this.state.loggedInUser}
              />

            )}
          />
          {/* <Route
            exact
            path="/favourites"
            render={() => (
    
   
            )}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
