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
          <div className="container h-100">
            <div className="row h-200 align-items-center">
              <div className="col-12 text-center">
                {/* <h1 className="font-weight-light">

                </h1> */}
                <br />
                <br />
                <br />
                <p className="lead">Hi {this.props.userData.username}</p>
                <p className="lead">Get some street credibility!</p>

                <div className="align-items-center">
                  <Map posts={this.state.listOfPosts} />
                  {/* check if posts are empty */}
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
