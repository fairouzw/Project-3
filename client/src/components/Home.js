import React, { Component } from "react";
import "../App.css";
import AddPost from "./AddPost";
import Map from "./Map";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: []
    };
  }

  getAllPosts = () => {
    axios.get(`/api/posts`).then(res => {
      // console.log(res.data);
      /* pagination ?limit=50 */
      this.setState({
        listOfPosts: res.data
      });
    });
  };

  componentDidMount = () => {
    this.getAllPosts();
  };

  render() {
    return (
      <div>
        <header className="masthead">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="container h-100 px-lg-5">
            <div className="row mx-lg-n5">
              <div className="col-12 col-md-8 py-3 px-lg-5">
                <Map posts={this.state.listOfPosts} />
              </div>
              <div className="col-6 col-md-4 py-3 px-lg-5">
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
