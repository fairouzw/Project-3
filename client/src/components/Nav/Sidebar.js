import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Modals from "../Home/Modals";
import Logo from "../Home/Logo";
import Logotext from "../Home/Logotext";
import "./Sidebar.css";

import "../../assets/vendor/nucleo/css/nucleo.css"
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";

// reactstrap components
import {
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";


class Sidebar extends Component {
  state = {
    collapseOpen: false,
    numberUnreadMessages: 0,
  };

  logoutUser = () => {
    axios
      .post("/api/logout")
      .then(() => {
        this.props.getUser(null);
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  getAllReceivedUnreadMessagesOfLoggedInUser = () => {
    axios.get(`/api/messages/unread`).then(res => {

      this.setState({
        numberUnreadMessages: res.data.count,

      });
    })
  };

  resetUnreadMessages = () => {
    this.setState({ numberUnreadMessages: 0 });
  }

  componentDidMount = () => {
    this.getAllReceivedUnreadMessagesOfLoggedInUser();
  };

  render() {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />

          </button>
          <br />

          <section id="_logo-desktop-nav">
            <Logo />
          </section>

          <section id="_logotext-desktop-nav">
            <Logotext />
          </section>
          {/* User */}

          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {/* {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null} */}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink tag={Link} to="/home" onClick={this.toggleCollapse}>
                  <i className="ni ni-square-pin" />
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <Modals
                  posts={this.state.listOfPosts}
                  postAdded={this.props.postAdded}
                />
              </NavItem>
            </Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
            <h6 className="navbar-heading ">My Profile</h6>
            {/* Navigation */}
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink tag={Link} to="/profile" onClick={this.toggleCollapse}>
                  <i className="ni ni-circle-08 " />
                  My Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/my-posts" onClick={this.toggleCollapse}>
                  <i className="ni ni-pin-3" />
                  My Posts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/favourites" onClick={this.toggleCollapse}>
                  <i className="ni ni-favourite-28 " />
                  My Favourites
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/messages" onClick={this.resetUnreadMessages && this.toggleCollapse}>
                  <i className="ni ni-email-83 " />
                  My Messages
                  {this.state.numberUnreadMessages === 0 ? <p></p> : <p>   <Badge fgColor="#195d8c">{this.state.numberUnreadMessages}</Badge> </p>}
                </NavLink>
              </NavItem>
            </Nav>
            <hr className="my-3" />
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" onClick={this.logoutUser}>
                  <i className="ni ni-button-power text-warning" />
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(Sidebar);

