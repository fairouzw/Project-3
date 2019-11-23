import React, { Component } from "react";
import "../App.css";
import AddPost from "./AddPost";
import Map from "./Map";
import axios from "axios";
import DisplayPost from "./DisplayPost";
import SearchPost from "./SearchPost";
import Popup from "./PopUp"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      filteredListOfPosts: [],
      showPopup: false
    };
  }

  getAllPosts = () => {
    axios.get(`/api/posts`).then(res => {
      // console.log(res.data);
      /* pagination ?limit=50 */
      this.setState({
        listOfPosts: res.data,
        filteredListOfPosts: res.data
      });
    });
  };

  componentDidMount = () => {
    this.getAllPosts();
  };

  searchResultPost = search => {

    // const results = postList.filter ... (that's what's actually happening here)
    const results = [];
    const postList = [...this.state.listOfPosts];
    console.log(this.state.listOfPosts)

    postList.forEach(p => {
      console.log(p.postname)
      if (p.postname.toLowerCase().includes(search.toLowerCase())) {
        results.push(p)
      }
    });

    this.setState({ filteredListOfPosts: results })
    console.log(results)
  };

  togglePopup = event => {
    event.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


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
                <Map posts={this.state.filteredListOfPosts} />
                {/* this.state.filteredListOfPosts */}
              </div>

              <div className="col-6 col-md-4 py-3 px-lg-5">

                <AddPost />
              </div>

            </div>
          </div>
        </header>
        <div className='popup-button'>
          <h1>Add Post</h1>
          <button onClick={this.togglePopup}>show popup</button>
          {this.state.showPopup ?
            <Popup
              text='Your next post:'
              closePopup={this.togglePopup}
            />
            : null
          }
        </div>
        <section className="py-5">
          <div className="container">
            <h2 className="font-weight-light">
              <div>
                <SearchPost searchPost={this.searchResultPost} />
              </div>
              <div>
                <DisplayPost posts={this.state.filteredListOfPosts}></DisplayPost>
              </div>
              All posts will be displayed here with search bar
            </h2>

          </div>
        </section>

      </div>
    );
  }
}

export default Home;
