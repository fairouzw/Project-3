import React, { Component } from "react";
import axios from "axios";

import "../App.css";

import UpdatePost from "./UpdatePost";
// import UpdateProfile from "./UpdateProfile";

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col
} from "reactstrap";
// core components

import UserHeader from "./UserHeader.jsx";

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
                                    </div>

                                    {/* <Form onSubmit={this.handleFormSubmit}>
                                        <h6 className="heading-small text-muted mb-4">
                                            User information
                  </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Username
                          </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={this.state.username}
                                                            id="input-username"
                                                            placeholder="Username"
                                                            type="text"
                                                            name="username"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                          </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            placeholder="email"
                                                            type="email"
                                                            name="email"
                                                            value={this.state.email}
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            First name
                          </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="Lucky"
                                                            id="input-first-name"
                                                            placeholder="First name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Last name
                          </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue="Jesse"
                                                            id="input-last-name"
                                                            placeholder="Last name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Button
                                                color="primary"
                                                size="sm"
                                                type="submit"
                                            >
                                                Save
                    </Button>
                                        </div>
                                       
                                       
                                        {/* <hr className="my-4" />
               
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
                                    {/* </Form> */}


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* <div className="my-posts">
                    <h5>My posts:</h5>
                </div> */}


            </div>
        )
    }
}
export default MyPosts;


