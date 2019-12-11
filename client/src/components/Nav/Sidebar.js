import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modals from "../Home/Modals";
import logo from '../Home/icons/finder-logo.png';

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
          <img className="logo-size" src={logo} alt="" />

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
                <NavLink tag={Link} to="/home">
                  <i className="ni ni-square-pin text-primary" />
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
            <h6 className="navbar-heading text-muted">My Profile</h6>
            {/* Navigation */}
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink tag={Link} to="/profile">
                  <i className="ni ni-circle-08 text-warning" />
                  My Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/my-posts">
                  <i className="ni ni-pin-3 text-blue" />
                  My Posts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/favourites">
                  <i className="ni ni-favourite-28 text-red" />
                  My Favourites
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/messages" onClick={this.resetUnreadMessages}>
                  <i className="ni ni-email-83 text-green" />
                  My Messages
                  {this.state.numberUnreadMessages === 0 ? <p></p> : <p>   <Badge color="success">{this.state.numberUnreadMessages}</Badge> </p>}
                </NavLink>
              </NavItem>
            </Nav>
            <hr className="my-3" />
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink onClick={this.logoutUser} href="/">
                  <i className="ni ni-button-power text-yellow" />
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

export default Sidebar;

// {/* <Nav className="align-items-center d-md-none">
// <UncontrolledDropdown nav>
//   <DropdownToggle nav className="nav-link-icon">
//     <i className="ni ni-bell-55" />
//   </DropdownToggle>
//   <DropdownMenu
//     aria-labelledby="navbar-default_dropdown_1"
//     className="dropdown-menu-arrow"
//     right
//   >
//     <DropdownItem>Action</DropdownItem>
//     <DropdownItem>Another action</DropdownItem>
//     <DropdownItem divider />
//     <DropdownItem>Something else here</DropdownItem>
//   </DropdownMenu>
// </UncontrolledDropdown>
// <UncontrolledDropdown nav>
//   <DropdownToggle nav>
//     <Media className="align-items-center">
//       <span className="avatar avatar-sm rounded-circle">
//         <img
//           alt="..."
//           src={require("../../assets/img/theme/team-1-800x800.jpg")}
//         />
//       </span>
//     </Media>
//   </DropdownToggle>
//   <DropdownMenu className="dropdown-menu-arrow" right>
//     <DropdownItem className="noti-title" header tag="div">
//     </DropdownItem>
//     <DropdownItem to="/profile" tag={Link}>
//       <i className="ni ni-circle-08" />
//       <span>My Account</span>
//     </DropdownItem>
//     <DropdownItem to="/my-posts" tag={Link}>
//       <i className="ni ni-pin-3" />
//       <span>My Posts</span>
//     </DropdownItem>
//     <DropdownItem to="/favourites" tag={Link}>
//       <i className="ni ni-favourite-28 " />
//       <span>My Favourites</span>
//     </DropdownItem>
//     <DropdownItem to="/messages" tag={Link}>
//       <i className="ni ni-email-83 " />
//       <span>Messages</span>
//     </DropdownItem>
//     <DropdownItem divider />
//     <DropdownItem /* href="#pablo" */ 
//     href="/" onClick={this.logoutUser}>
//       <i className="ni ni-button-power" />
//       <span>Logout</span>
//     </DropdownItem>
//   </DropdownMenu>
// </UncontrolledDropdown>
// </Nav> */}