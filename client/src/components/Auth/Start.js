import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "../../App.css";
import logo from '../Home/icons/finder-logo.png';
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../../assets/vendor/nucleo/css/nucleo.css"
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// import Background from './Fernsehturm_claudio-schwarz-purzlbaum-pN684G33h.jpg';

class Start extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="main-content">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <img className="logo-start" src={logo} alt="" />
          <div className="header  py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">

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
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <Link to="/signup">
                          <button id="btn-fg" className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2">
                            Sign up
   </button>
                        </Link>


                      </FormGroup>

                      <FormGroup>

                        <Link to="/login">
                          <button id="btn-fg" className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2">
                            Login
   </button>
                        </Link>
                      </FormGroup>

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
                      <br></br>
                      <br></br>

                      <div className="text-center">

                      </div>
                    </Form>
                  </CardBody>
                </Card>

              </Col>

            </Row>
          </Container>
        </div>
      </div>



    )
  }
}

export default Start;

// {/* <section className="landing-page">




// <div className="main-content">

//   <div>
//     <br />
//     <br />

//     <img className="logo-start" src={logo} alt="" />
//     <br />
//     <br />
//     {/* <div className="city-banner">The city is free.</div> */}



//     <br />
//     <br />
//     <br />
//     <br />
//     <br />
//     <br />
//     <br />
//     <br />

//     {/* // how to make the buttons transparent?? */}
//     <Container className="mt--8 pb-5">
//       <Row className="justify-content-center">
//         <Col lg="5" md="7">
//           <Card className="light border-0" style={{ backgroundColor: "transparent" }}>

//             <CardBody className="px-lg-5 py-lg-5">
//               <div className="text-center text-muted mb-4">



//               </div>
//               <Form role="form">
//                 <FormGroup className="mb-3">
//                   <Link to="/signup">
//                     <button className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2">
//                       Sign up
//   </button>
//                   </Link>


//                 </FormGroup>

//                 <FormGroup>

//                   <Link to="/login">
//                     <button className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2">
//                       Login
//   </button>
//                   </Link>
//                 </FormGroup>



//                 <div className="text-center">

//                 </div>
//               </Form>
//             </CardBody>
//           </Card>

//         </Col>
//       </Row>
//     </Container>


//     <br />
//     <br />
//     <br />
//     <br />
//     <br />
//     <br />

//     <br />
//     <br />
//   </div>
// </div>
// </section> */}