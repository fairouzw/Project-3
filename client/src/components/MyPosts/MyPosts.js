import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import UpdatePost from "../Posts/UpdatePost";
import UserHeader from "../Profile/UserHeader.jsx";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Container,
  Row,
  CardHeader,
  CardTitle,
  CardFooter
} from "reactstrap";
// core components

class MyPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.userData.username,
      email: this.props.userData.email,
      listOfPosts: []
    };
  }

  getAllUserPosts = () => {
    axios.get(`/api/posts?owner_id=${this.props.userData._id}`).then(res => {
      this.setState({
        listOfPosts: res.data
      });
    });
  };

  componentDidMount = () => {
    this.getAllUserPosts();
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, email } = this.state;

    axios
      .put(`/api/profiles/${this.props.userData._id}`, { username, email })
      .then(() => {
        this.props.history.push("/profile");
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="main-content" ref="mainContent">
        <UserHeader userName={this.state.username} />
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    {" "}
                    <h3 className="mb-0"> All My Posts</h3>
                  </button>
                </CardHeader>
                <Card>
                  <div className="all-posts">
                    {this.state.listOfPosts.length === 0 ? (
                      <h4>You have no posts yet.</h4>
                    ) : (
                      <Row style={{ justifyContent: "center" }}>
                        {this.state.listOfPosts.map(post => {
                          return (
                            <Card>
                              <div className="one-post" key={post._id}>
                                <CardImg
                                  className="post-pic"
                                  src={post.imgUrl}
                                  alt=""
                                  style={{
                                    height: "250px",
                                    objectFit: "contain"
                                  }}
                                />
                                <CardBody style={{ textAlign: "center" }} >
                                  <CardTitle key={post._id}>
                                    {post.postname}
                                  </CardTitle>
                                  <CardText>
                                    <div>{post.description}</div>
                                    <UpdatePost
                                      posts={this.state.listOfPosts}
                                      id={post._id}
                                      postname={post.postname}
                                      description={post.description}
                                      imgUrl={post.imgUrl}
                                      getAllUserPosts={this.getAllUserPosts}
                                    >
                                      {" "}
                                      Test
                                    </UpdatePost>
                                  </CardText>
                                </CardBody>
                              </div>
                            </Card>
                          );
                        })}
                      </Row>
                    )}
                  </div>
                </Card>
                <CardFooter className="py-4"></CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
export default MyPosts;
