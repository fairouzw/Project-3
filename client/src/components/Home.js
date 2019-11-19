import React, { Component } from "react";
import "../App.css";
import AddPost from "./AddPost";
import Map from "./Map";

class Home extends Component {
  render() {
    return (
      <div>
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-200 align-items-center">
              <div className="col-12 text-center">
                <h1 className="font-weight-light"></h1>
                <br />
                <br />
                <br />

                <p className="lead">Hi {this.props.userData.username}</p>
                <p className="lead">Get some street credibility!</p>
                <div className="align-items-center">
                  <Map />
                </div>
              </div>
              <div>
                <AddPost />
              </div>
            </div>
          </div>
        </header>
        <section className="py-5">
          <div className="container">
            <h2 className="font-weight-light">
              All posts will be displayed here with search bar
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repellendus ab nulla dolorum autem nisi officiis blanditiis
              voluptatem hic, assumenda aspernatur facere ipsam nemo ratione
              cumque magnam enim fugiat reprehenderit expedita.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
