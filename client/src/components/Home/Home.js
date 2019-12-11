import React, { Component } from "react";
import "../../App.css";
import Map from "./Map";
import axios from "axios";
import PostList from "./PostList";
import SearchPost from "./SearchPost";
import DisplayPost from "../Posts/DisplayPost";
import Header from "./Header.jsx";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Pagination,
  PaginationLink,
  PaginationItem,
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
    console.log(this.state.listOfPosts);

    postList.forEach(p => {
      p.tags.map(i => {
        if (i.toLowerCase().includes(search.toLowerCase())) {
          return results.push(p);
        }
      });

      if (p.postname.toLowerCase().includes(search.toLowerCase())) {
        results.push(p);
      }

      if (p.description.toLowerCase().includes(search.toLowerCase())) {
        results.push(p);
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
        <Header />
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
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
