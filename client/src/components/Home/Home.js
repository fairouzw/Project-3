import React, { Component } from "react";
import "../../App.css";
import Map from "./Map";
import axios from "axios";
import PostList from "./PostList";
import SearchPost from "./SearchPost";
import DisplayPost from "../Posts/DisplayPost";
import Loader from "react-loader-spinner";
import Footer from '../Footer/Footer'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardFooter
} from "reactstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      filteredListOfPosts: [],
      showPopup: false,
      selectedPost: null
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
    this.setState({
      isLoading: false
    });
  };

  searchResultPost = search => {
    const results = [];
    const postList = [...this.state.listOfPosts];
    // console.log(this.state.listOfPosts);

    postList.forEach(p => {
      for (let tag of p.tags) {
        if (tag.toLowerCase().includes(search.toLowerCase())) {
          return results.push(p);
        }
      }

      if (p.postname.toLowerCase().includes(search.toLowerCase())) {
        return results.push(p);
      }

      if (p.description.toLowerCase().includes(search.toLowerCase())) {
        return results.push(p);
      }
    });
    this.setState({ filteredListOfPosts: results });
  };

  togglePopup = event => {
    event.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  setSelectedPost = post => {
    this.setState({
      selectedPost: post
    });
  };

  render() {
    return (
      <div className="main-content" ref="mainContent">
        {/* <Header /> */}
        <div className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage: "url(" + require("../../assets/img/berlin-pics/anastasia-dulgier-KX8xURPbkcM-unsplash_copy.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}></div>
        <Container className="mt--7" fluid>
          <Row>
            <Col
              xl={this.state.selectedPost !== null ? 8 : 12}
              style={{ transition: "all ease 0.4s" }}
            >
              <Card
                style={{ borderRadius: "25px" }}
                className="shadow border-0"
              >
                {/* MAP */}
                {this.state.isLoading ? (
                  <Loader
                    type="Oval"
                    color="blue"
                    height={100}
                    width={100}
                    timeout={5000}
                  />
                ) : (
                    <Map
                      setSelectedPost={this.setSelectedPost}
                      selectedPost={this.state.selectedPost}
                      posts={this.state.filteredListOfPosts}
                    />
                  )}
              </Card>
            </Col>
            {this.state.selectedPost !== null ? (
              <Col xl="4">
                <Card className="shadow border-0">
                  {/* DISPLAYED POST */}
                  <DisplayPost selectedPost={this.state.selectedPost} />
                </Card>
              </Col>
            ) : null}
          </Row>
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <br />
                  <h3 className="mb-0">
                    {" "}
                    <SearchPost searchPost={this.searchResultPost} />
                  </h3>
                </CardHeader>
                <CardBody>
                  <PostList posts={this.state.filteredListOfPosts}></PostList>
                </CardBody>
               
                <CardFooter> </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>

        <Footer> </Footer>
        {/* <footer>Photo by Julia Solonina on Unsplash</footer> */}
      </div>
    );
  }
}

export default Home;
