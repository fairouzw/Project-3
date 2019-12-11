import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
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
      <section className="landing-page">
        <div className="main-content">
          <div>
            <br />
            <br />
            <div className="city-banner">The city is free.</div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* // how to make the buttons transparent?? */}
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="7">
                  <Card className="light border-0" style={{ backgroundColor: "transparent" }}>

                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">



                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <Link to="/signup">
                            <button className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2">
                              Sign up
          </button>
                          </Link>


                        </FormGroup>

                        <FormGroup>

                          <Link to="/login">
                            <button className="btn btn-lg btn-light btn-block btn-login text-uppercase font-weight-bold mb-2">
                              Login
          </button>
                          </Link>
                        </FormGroup>



                        <div className="text-center">

                        </div>
                      </Form>
                    </CardBody>
                  </Card>

                </Col>
              </Row>
            </Container>


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <br />
            <br />
          </div>
        </div>
      </section>
    )
  }
}

export default Start;
