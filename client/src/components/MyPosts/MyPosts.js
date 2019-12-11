import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import UpdatePost from "../Posts/UpdatePost";
import UserHeader from "../Profile/UserHeader.jsx";

import {

  Card,
  CardImg,
  CardHeader,
  CardBody,
  Container,
  Row,
  Pagination,
  PaginationLink,
  PaginationItem,
    Button,
    Col,
    CardFooter,
    Pagination,


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
                    <h3 className="mb-0">
                      {" "}
                      {/* <SearchPost searchPost={this.searchResultPost} /> */}
                      All My Posts
                    </h3>
                  </button>
                </CardHeader>
                <CardBody>
                  <div className="all-posts">
                    <Row style={{ justifyContent: "center" }}>
                      {this.state.listOfPosts.map(post => {
                        return (
                          <Card>
                            <div className="one-post" key={post._id}>
                              <CardImg
                                className="post-pic"
                                src={post.imgUrl}
                                alt=""
                                style={{ height: "250px", objectFit: "contain"}}
                              />
                              <br></br>
                              <h3 key={post._id}>{post.postname}</h3>
                              <div>{post.description}</div>
                              <br></br>
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
                            </div>
                          </Card>
                        );
                      })}
                    </Row>
                  </div>
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
export default MyPosts;
