import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

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

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Log in</h3>
                      <div style={{ color: "red" }}>
                        {" "}
                        {this.state.errorMessage}
                      </div>
                      <form onSubmit={this.handleFormSubmit}>
                        <div className="form-label-group">
                          <input
                            type="text"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            onChange={e => this.handleChange(e)}
                            value={this.state.username}
                            required="required"
                            autoFocus
                          />
                          <label htmlFor="inputEmail">Username</label>
                        </div>

                        <div className="form-label-group">
                          <input
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={e => this.handleChange(e)}
                            value={this.state.password}
                            required="required"
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>

                        <button
                          className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                          type="submit"
                        >
                          Log in
                      </button>
                        <div className="text-center"></div>
                        <div class="text-center">
                          <Link class="small" to="/signup">Don't have an account?</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(Login);

      // /* old sign up */
      // <div className="landing-page">
      //   <div className="main-content">
      //     <div className="header  py-7 py-lg-8">
      //       <Container>
      //         <div className="header-body text-center mb-7">
      //           <Row className="justify-content-center">
      //             <Col lg="5" md="6">
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //               <br></br>
      //             </Col>
      //           </Row>
      //         </div>
      //       </Container>
      //       <div className="separator separator-bottom separator-skew zindex-100">
      //         <svg
      //           xmlns="http://www.w3.org/2000/svg"
      //           preserveAspectRatio="none"
      //           version="1.1"
      //           viewBox="0 0 2560 100"
      //           x="0"
      //           y="0"
      //         >
      //           {/* <polygon
      //             className="fill-default"
      //             points="2560 0 2560 100 0 100"
      //           /> */}
      //         </svg>
      //       </div>
      //     </div>
      //     {/* Page content */}
      //     <Container className="mt--8 pb-5">
      //       <Row className="justify-content-center">


      //         {/* LOGIN FORM */}
      //         <Col lg="5" md="7">
      //           <Card className="light border-0" style={{ backgroundColor: "transparent" }} >

      //             <CardBody className="px-lg-5 py-lg-5">
      //               <div className="text-center text-muted mb-4">

      //                 <small>Log in in with credentials</small>

      //               </div>
      //               <Form onSubmit={this.handleFormSubmit} role="form">
      //                 <FormGroup className="mb-3">
      //                   <InputGroup className="input-group-alternative">
      //                     <InputGroupAddon style={{ backgroundColor: "white" }} addonType="prepend">
      //                       <InputGroupText>
      //                         <i className="ni ni-circle-08" />
      //                       </InputGroupText>
      //                     </InputGroupAddon>

      //                     <Input
      //                       placeholder="Username"
      //                       name="username"
      //                       value={this.state.username}
      //                       onChange={e => this.handleChange(e)}
      //                     />
      //                   </InputGroup>
      //                 </FormGroup>
      //                 <FormGroup>
      //                   <InputGroup className="input-group-alternative">
      //                     <InputGroupAddon addonType="prepend">
      //                       <InputGroupText>
      //                         <i className="ni ni-lock-circle-open" />
      //                       </InputGroupText>
      //                     </InputGroupAddon>
      //                     <Input
      //                       placeholder="Password"
      //                       type="password"
      //                       name="password"
      //                       value={this.state.password}
      //                       onChange={e => this.handleChange(e)}
      //                     />
      //                   </InputGroup>
      //                 </FormGroup>

      //                 <div style={{ color: "red" }}>
      //                   {this.state.errorMessage}
      //                 </div>

      //                 <div className="text-center">
      //                   <Button
      //                     className="my-4"
      //                     color="primary"
      //                     type="submit">
      //                     Log in
      //             </Button>
      //                 </div>
      //               </Form>
      //             </CardBody>
      //           </Card>
      //           <Row className="text -center mt-3">
      //             <Col className="" xs="12">
      //               <Link
      //                 className="text-light"
      //                 to="/signup"
      //               >
      //                 <small>Create new account</small>
      //               </Link>
      //             </Col>
      //           </Row>
      //         </Col>

      //       </Row>
      //     </Container>
      //   </div>
      // </div>
