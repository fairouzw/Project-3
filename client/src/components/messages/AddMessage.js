import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import { withRouter } from "react-router-dom";
import Avatar from "react-avatar";
import Footer from '../Footer/Footer'

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,

} from "reactstrap";

class AddMessage extends Component {
  constructor() {
    super();
    this.state = {
      subject: "",
      content: "",
      recipient: "",
      recipientData: "",
      listOfPosts: [],
      likesNumber: 0,
      hasLikedList: []
    };
  }

  getRecipientUsername = () => {
    const rec = this.props.match.params.id;
    axios.get(`/api/messages/new-message/${rec}`).then(res => {
      this.setState({
        recipientData: res.data
      });
    });
  };
  getAllUserPosts = () => {
    const rec = this.props.match.params.id;
    axios.get(`/api/posts?owner_id=${rec}`).then(res => {
      this.setState({
        listOfPosts: res.data
      });
      this.getLikesNumber(res.data);
    });
  };

  componentDidMount = () => {
    this.getRecipientUsername();
    this.getAllUserPosts();
    this.getAllPosts();
  };

  getAllPosts = () => {
    axios.get(`/api/posts`).then(res => {
      this.setState({
        listOfLikePosts: res.data
      });
      this.getFavouritesNumber(res.data);
    });
  };
  getFavouritesNumber = listOfLikePosts => {
    const hasLikedList = [];
    console.log(listOfLikePosts);
    console.log(hasLikedList);
    listOfLikePosts.forEach(post => {
      if (post.hasLiked) {
        hasLikedList.push(post);
      }
    });
    this.setState({
      hasLikedList: hasLikedList
    });
  };

  getLikesNumber = b => {
    let likesNumber = 0;
    console.log(b);

    b.forEach(post => {
      console.log(post);
      likesNumber += post.likes;
    });
    this.setState({
      likesNumber: likesNumber
    });
  };

  handleFormSubmit = event => {
    const recId = this.props.match.params.id;
    event.preventDefault();
    console.log("i clicked");
    const { subject, content } = this.state;
    axios
      .post(`/api/messages/new-message/${recId}`, {
        subject,
        content,
        recipient: recId
      })
      .then(response => {
        this.props.history.push("/messages");
        this.setState({
          subject: "",
          content: "",

          recipient: "",
          recipientData: "",
          listOfPosts: [],
          likesNumber: 0,
          hasLikedList: []
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {

    return (
      <div className="main-content" ref="mainContent">
        {/* <Header /> */}

        <div
          className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" + require("../Home/icons/imm016_N16.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        ></div>
        <Container className="mt--7" fluid style={{ justifyContent: "center" }}>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-avatar-image">

                      <Avatar color="#B0CBE0" size="175" className="rounded-circle" name={this.state.recipientData.username} />
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
                    <h3>{this.state.recipientData.username}</h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.recipientData.city}{" "}
                      {this.state.recipientData.country}
                    </div>

                    <hr className="my-4" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3>Send Message to {this.state.recipientData.username}</h3>{" "}
                </CardHeader>
                <CardBody
                  style={{ justifyContent: "center" }}
                  className="bg-gradient-secondary shadow"
                >
                  <form onSubmit={this.handleFormSubmit}>
                    <div className="text-center">
                      <Col md="50" style={{ justifyContent: "center" }}>
                        <label htmlFor="subject">Subject:</label>
                        <FormGroup style={{ justifyContent: "center" }}>
                          <Input
                            id="subject"
                            placeholder="subject"
                            type="text"
                            name="subject"
                            value={this.state.subject}
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="50" style={{ justifyContent: "center" }}>
                        <label htmlFor="content">Content:</label>
                        <FormGroup>
                          <Input
                            id="content"
                            placeholder="your text"
                            type="textarea"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            required
                            className="form-control-alternative"
                            rows="3"
                          />
                        </FormGroup>
                      </Col>

                      <br />
                      <div className="marge-addmess">
                        <Button
                          id="btn-submit"
                          className="shadow btn-login btn-block text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          SEND
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer> </Footer>
      </div>
    );
  }
}

export default withRouter(AddMessage);
