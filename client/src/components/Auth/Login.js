import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
import "../../assets/vendor/nucleo/css/nucleo.css"
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/login", this.state)
      .then(response => {
        this.props.getUser(response.data);
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({
          errorMessage: "Incorrect login details!"
        });
        console.log("Incorrect login details!");
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /* <div>
        <div style={{backgroundColor: "#172b4d"}} className="main-content">
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7"></div>   
            
            <footer --> style={{ backgroundColor: "#172b4d" }} <-- />
            
            ---> that's the UI-code for blue background*/

  render() {
    return (
      <div className="landing-page">
        <div className="main-content">
          <div className="header  py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    {/* <h1 className="text-white">The city is free.</h1> */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* <p className="text-lead text-light">
                  The catching slogan Lena suggested which I clearly forgot.
                </p> */}
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                {/* <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                /> */}
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">


              {/* LOGIN FORM */}
              <Col lg="5" md="7">
                <Card className="light border-0" style={{ backgroundColor: "transparent" }} >

                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">

                      <small>Log in in with credentials</small>

                    </div>
                    <Form onSubmit={this.handleFormSubmit} role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon style={{ backgroundColor: "white" }} addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>

                          <Input
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={e => this.handleChange(e)}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                          />
                        </InputGroup>
                      </FormGroup>

                      <div style={{ color: "red" }}>
                        {this.state.errorMessage}
                      </div>

                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="submit">
                          Log in
                  </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="text -center mt-3">
                  {/* <Col xs="6">
              <Link
                className="text-light"
              >
                <small>Forgot password?</small>
              </Link>
            </Col> */}
                  <Col className="" xs="12">
                    <Link
                      className="text-light"
                      to="/signup"
                    >
                      <small>Create new account</small>
                    </Link>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Container>
        </div>
        <footer className="py-5">
          <Container  >
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2018{" "}
                  <Link
                    className="font-weight-bold ml-1"

                  >
                    Creative Tim
                  </Link>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="text-light nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink


                    >
                      Creative Tim
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink


                    >
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink

                    >
                      Blog
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink

                    >
                      MIT License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>

    );
  }
}

export default withRouter(Login);

