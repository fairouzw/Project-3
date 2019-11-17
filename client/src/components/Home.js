import React, { Component } from "react";
import "../App.css";
import AddPost from "./AddPost";

class Home extends Component {
  render() {
    return (
      <div>
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center">
                <h1 className="font-weight-light">Our Map Will Be Here</h1>
                <p className="lead">{this.props.userData.username}</p>
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
