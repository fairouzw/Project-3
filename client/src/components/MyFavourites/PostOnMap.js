import React, { Component } from "react";
import "../../App.css";
import DisplayPost from "../Posts/DisplayPost";
import Header from "../Home/Header";
import FavMap from "./FavMap";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { Card, CardBody, Container, Row, Col } from "reactstrap";

class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      listOfPosts: [],
      filteredListOfPosts: [],
      selectedPost: null
    };
  }

  componentDidMount() {
    this.getSinglePost();
  }

  getSinglePost = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/api/posts/${id}`)
      .then(response => {
        this.setState({
          selectedPost: response.data
        });
      })
      .catch(err => {
        console.log("something went wrong", err);
      });
  };

  render() {
    return (
      <div className="main-content" ref="mainContent">
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-secondary shadow">
                {/* MAP */}
                {this.state.selectedPost ? (
                  <FavMap
                    selectedPost={this.state.selectedPost}
                    posts={this.state.filteredListOfPosts}
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </Card>
            </Col>
            <Col xl="4">
              <Card className="bg-gradient-secondary shadow">
                <CardBody>
                  {/* DISPLAYED POST */}
                  {this.state.selectedPost ? (
                    <DisplayPost selectedPost={this.state.selectedPost} />
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(PostDetails);
