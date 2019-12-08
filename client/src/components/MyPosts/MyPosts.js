import React, { Component } from "react";
import axios from "axios";

import "../../App.css";

import UpdatePost from "../Posts/UpdatePost";

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    CardFooter,
    Pagination, 
    PaginationLink,
    PaginationItem
} from "reactstrap";
// core components

import UserHeader from "../Profile/UserHeader.jsx";

class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userData,
            username: this.props.userData.username,
            email: this.props.userData.email,
            listOfPosts: [],
        };
    }

    getAllUserPosts = () => {
        axios.get(`/api/posts?owner_id=${this.props.userData._id}`).then(res => {
            this.setState({
                listOfPosts: res.data
            });
        })
    }

    componentDidMount = () => {
        this.getAllUserPosts();
    };


    handleFormSubmit = event => {
        event.preventDefault();
        const { username, email } = this.state;

        axios
            .put(`/api/profiles/${this.props.userData._id}`, { username, email })
            .then(() => {
                // this.props.getUser();
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
            <div className="main-content" ref="mainContent" >
                <UserHeader userName={this.state.username} />
                <Container className="mt--7" fluid>

            <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  {/* <br /> */}
                  <h3 className="mb-0">
                    {" "}
                    {/* <SearchPost searchPost={this.searchResultPost} /> */}
                    All My Posts
                  </h3>
                </CardHeader>
                <CardBody>
                <div className="all-posts">
                                        <Row style={{ justifyContent: "center" }}>
                                            {this.state.listOfPosts.map(post => {
                                                return (

                                                    <div className="one-post" key={post._id} >
                                                        <br></br>
                                                        <h3 key={post._id}>{post.postname}</h3>
                                                        <div>{post.description}</div>
                                                        <img className="post-pic" src={post.imgUrl} alt=""></img>
                                                        <br></br>
                                                        <UpdatePost
                                                            posts={this.state.listOfPosts}
                                                            id={post._id}
                                                            postname={post.postname}
                                                            description={post.description}
                                                            imgUrl={post.imgUrl}
                                                            getAllUserPosts={this.getAllUserPosts}
                                                        > Test</UpdatePost>

                                                    </div>


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
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                {/* Beautiful code, I'm sorry for commenting it out for now. */}
                                <div className="avatar-circle"> <span className="initials">{this.state.username[0]}</span></div>
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            {/* <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={require("../assets/img/theme/team-4-800x800.jpg")}
                                            /> */}
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">

                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                <div>
                                                    <span className="heading">{this.state.listOfPosts.length}</span>
                                                    <span className="description">Posts</span>
                                                </div>

                                                {/* <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Comments</span>
                                                </div> */}
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Likes</span>
                                                </div>
                                                <div>
                                                    <span className="heading">0</span>
                                                    <span className="description">Favourites</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3>
                                            {this.state.username}

                                        </h3>

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">My Posts:</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">

                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    <div className="all-posts">
                                        <Row style={{ justifyContent: "center" }}>
                                            {this.state.listOfPosts.map(post => {
                                                return (

                                                    <div className="one-post" key={post._id} >
                                                        <br></br>
                                                        <h3 key={post._id}>Thing: {post.postname}</h3>
                                                        <div>Description: {post.description}</div>
                                                        <img className="post-pic" src={post.imgUrl} alt=""></img>

                                                        <br></br>
                                                        <UpdatePost
                                                            posts={this.state.listOfPosts}
                                                            id={post._id}
                                                            postname={post.postname}
                                                            description={post.description}
                                                            imgUrl={post.imgUrl}
                                                            getAllUserPosts={this.getAllUserPosts}
                                                        > Test</UpdatePost>

                                                    </div>


                                                );
                                            })}
                                        </Row>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
 </div>
        )
    }
}
export default MyPosts;


