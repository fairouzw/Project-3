import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import Avatar from "react-avatar";
import Footer from "../Footer/Footer";
import AlertConfirm from "../How-To/AlertConfirm";
import { Modal } from "reactstrap";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components

import UserHeader from "./UserHeader.jsx";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userData: this.props.userData,
      username: this.props.userData.username,
      email: this.props.userData.email,
      city: this.props.userData.city,
      country: this.props.userData.country,
      listOfPosts: [],
      likesNumber: 0,
      hasLikedList: [],
      counter: 0,
      createDeleteModal: false,
      updated: false,
    };
  }

  getAllUserPosts = () => {
    axios.get(`/api/posts?owner_id=${this.props.userData._id}`).then((res) => {
      this.setState({
        listOfPosts: res.data,
      });
      this.getLikesNumber(res.data);
    });
  };

  // getTheUser = () => {
  //   axios
  //     .get(`/api/profiles/${this.props.userData._id}`).then(res => {
  //       this.setState({
  //         username: res.data.username,
  //       });

  //     })
  //     .catch(err => {
  //       console.log("backend not running or whatever !");
  //     });
  // };

  componentDidMount = () => {
    this.getAllUserPosts();
    this.getAllPosts();

  };


  // toggleUpdateModal = () => {
  //   this.setState({
  //     createUpdateModal: !this.state.createUpdateModal,
  //   });
  // };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, city, country } = this.state;

    axios
      .put(`/api/profiles/${this.props.userData._id}`, {
        username,
        email,
        city,
        country,
      }).then(() => {
        alert("Yay! Your data has been updated successfully.");
        window.location.reload();
      })

      .catch((error) => console.log(error));
  };


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getAllPosts = () => {
    axios.get(`/api/posts`).then((res) => {
      this.setState({
        listOfLikePosts: res.data,
      });
      this.getFavouritesNumber(res.data);
    });
  };
  getFavouritesNumber = (listOfLikePosts) => {
    const hasLikedList = [];
    console.log(listOfLikePosts);
    console.log(hasLikedList);
    listOfLikePosts.forEach((post) => {
      if (post.hasLiked) {
        hasLikedList.push(post);
      }
    });
    this.setState({
      hasLikedList: hasLikedList,
    });
  };

  getLikesNumber = (b) => {
    let likesNumber = 0;
    console.log(b);

    b.forEach((post) => {
      console.log(post);
      likesNumber += post.likes;
    });
    this.setState({
      likesNumber: likesNumber,
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      createDeleteModal: !this.state.createDeleteModal,
    });
  };


  handleDelete = (event) => {
    event.preventDefault();

    axios
      .put(`/api/profiles/${this.props.userData._id}`, {
        username: "User deleted",
        email: "",
        city: "",
        country: "",
        password: ""

      })
      .then(() => {
        axios
          .post("/api/logout")
          .then(() => {
            this.props.getUser(null);
            this.props.history.push("/");
            this.toggleDeleteModal(event);
          })
          .catch(error => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  // deleteAccount = () => {
  //   axios.delete(`/api/profiles/${this.props.userData._id}/delete`)
  //     .then(() => {
  //       // this.setState({ loggedInUser: null });
  //       // this.props.getUser(null);
  //     })
  //     .catch(error => {
  //       console.log("not able to delete account", error)
  //     })
  // }

  render() {
    return (


      <div className="main-content" ref="mainContent">
        {!this.props.getUser.confirmed ? <AlertConfirm /> : null}
        <UserHeader userName={this.props.userData.username} />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-avatar-image">
                      <Avatar
                        color="#FE9D49"
                        fgColor="#195d8c"
                        size="175"
                        className="rounded-circle"
                        name={this.props.userData.username}
                      />
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">
                            {this.state.listOfPosts.length}
                          </span>
                          <span className="description">Posts</span>
                        </div>
                        <div>
                          <span className="heading">
                            {this.state.likesNumber}
                          </span>
                          <span className="description">Likes</span>
                        </div>
                        <div>
                          <span className="heading">
                            {this.state.hasLikedList.length}
                          </span>
                          <span className="description">Favourites</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>{this.props.userData.username}</h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.props.userData.city} {this.props.userData.country}
                    </div>


                    <hr className="my-4" />

                    {/* <button type="submit" className="btn btn-danger" onClick={() => this.deleteAccount()}>Delete Account</button> */}
                    <div className="text-center">
                      <p></p>
                      <Button
                        id="btn-delete"
                        className="danger text-uppercase font-weight-bold "
                        type="submit"
                        color="danger"
                        onClick={this.toggleDeleteModal}
                      >
                        Delete Account
        </Button>


                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.createDeleteModal}
                        toggle={this.toggleDeleteModal}
                      >
                        <div className="modal-header" >
                          <h5 className="modal-title" id="exampleModalLabel">
                            Are you sure you want to delete your account? <br />

                          </h5>
                        </div>
                        <div className="modal-header">
                          <Button

                            id="btn-delete"
                            className="danger text-uppercase font-weight-bold "
                            type="submit"
                            color="danger"
                            onClick={this.handleDelete}
                          >
                            Yes, please.
        </Button>
                          <Button

                            className="warning text-uppercase font-weight-bold "
                            type="submit"
                            color="warning"
                            onClick={this.toggleDeleteModal}
                          >
                            No, wait!
        </Button>
                        </div>
                      </Modal>

                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-light shadow">
                <CardHeader className="bg-white border-0">
                  <h3>My Account</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleFormSubmit}>
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
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="City"
                              type="text"
                              name="city"
                              value={this.state.city}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              name="country"
                              value={this.state.country}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="marge-addmess">
                        <Button
                          id="btn-submit"
                          className="shadow btn-login text-uppercase font-weight-bold "
                          onClick={this.toggleUpdateModal}
                          type="submit"

                        >
                          Save
                        </Button>
                        {/* <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.createUpdateModal}
                          toggle={this.toggleUpdateModal}
                        >
                          <div className="modal-header" >
                            <h5 className="modal-title" id="exampleModalLabel">
                              Are you sure you want to change your data? <br />

                            </h5>
                          </div>
                          <div className="modal-header">
                            <Button

                              id="btn-delete"
                              className="danger text-uppercase font-weight-bold "
                              type="submit"
                              color="danger"
                              onSubmit={this.handleFormSubmit}
                            >
                              Yes, please.
        </Button>
                            <Button

                              className="warning text-uppercase font-weight-bold "
                              type="submit"
                              color="warning"
                              onClick={this.toggleUpdateModal}
                            >
                              No, wait!
        </Button>
                          </div>
                        </Modal> */}

                      </div>


                    </div>
                    <hr className="my-4" />
                    {/* Address */}

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
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
        {/* <footer>Photo by Anastasia Dulgier</footer> */}
        <Footer> </Footer>
      </div>

    );
  }
}

export default withRouter(Profile);

