import React, { Component } from "react";
import Footer from "../Footer/Footer";
import "./HowTo.css";
import BoxesSldies from "./BoxesSlides";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

class HowTo extends Component {
  render() {
    return (
      <div className="main-content" ref="mainContent">
        <div
          className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" +
              require("../../assets/img/berlin-pics/anastasia-dulgier-KX8xURPbkcM-unsplash_copy.jpg") +
              ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        ></div>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">How it Works</h3>
                </CardHeader>
                <CardBody>
                  <Container className="instruction-box">
                    <Row>
                      <Col className="heading-box">
                        <h5>Searching for free stuff?</h5>
                      </Col>
                    </Row>
                    <Row>
                      <ol>
                        <li>
                          Navigate to “HOME” and browse your feed for free
                          things.{" "}
                        </li>
                        <li>
                          Use the search bar to search for something you want in
                          particular e.g “plates”, “plants” etc.
                        </li>
                        <li>
                          Use the map to search for things in your location
                          <ul>
                            <li>
                              {" "}
                              select the icon in the top left corner of the map
                              to see your current location{" "}
                            </li>
                            <li>select on the pins on the map to view boxes</li>
                          </ul>
                        </li>
                        <li>The posts are live for 24hours - so be quick!</li>
                        <li>
                          If you have managed to find a box - leave a comment in
                          the post, notifying the community of the things you’ve
                          taken and/or the general quality of the items.
                        </li>
                      </ol>
                    </Row>
                  </Container>
                  <Container className="instruction-box">
                    <Row>
                      <Col className="heading-box">
                        <h5>
                          Spring cleaning or want to get rid of something?{" "}
                        </h5>
                      </Col>
                    </Row>
                    <Row>
                      <ol>
                        <li>
                          Prepare you box of things you want to get rid of e.g.
                          clothes, shoes, small furniture, books, deco. Items,
                          kitchenware, small working appliances etc..{" "}
                        </li>
                        <li>
                          Clearly mark the box with the following text: “ZU
                          VERSCHENKEN” or “FOR FREE” or “FREE TO TAKE”.
                        </li>
                        <li>
                          Place the box outside, preferably on the sidewalk.
                        </li>
                        <li>
                          Make sure that the box does not obstruct pedestrian
                          traffic.
                        </li>
                        <li>
                          On the app, click on “Add a box” in the menu bar.
                        </li>
                        <li>
                          A pop-up will appear,
                          <ul>
                            <li> add a short title,</li>
                            <li>
                              then take a clear picture of the box and its
                              contents.{" "}
                            </li>
                            <li>
                              Optional - add a brief description of the contents
                              of the box and quality of the items.{" "}
                            </li>
                          </ul>
                        </li>
                        <li>
                          <b>
                            <u>
                              Please refrain from using offensive, racist,
                              sexists or any discriminatory language, images and
                              symbols.{" "}
                            </u>
                          </b>
                        </li>
                        <li> Click “Add Box”!</li>
                        <li>
                          {" "}
                          Enjoy the warm fuzzy feeling of giving back to your
                          community.{" "}
                        </li>
                        <li>
                          If you’re using your mobile phone and are unable to
                          post something you may need to enable your location
                          settings and privacy settings.{" "}
                        </li>
                      </ol>
                    </Row>
                  </Container>
                  <Container className="instruction-box">
                    <Row>
                      <Col className="heading-box">
                        <h5>Spotted a box of free things?</h5>
                      </Col>
                    </Row>
                    <Row>
                      <ol>
                        <li>
                          If you’re passing by a box of free things and wish to
                          share it with the community:
                        </li>
                        <li>
                          {" "}
                          Go to the SPOTBOX app, click on “Add a box” in the
                          menu bar.
                        </li>
                        <li> A pop-up will appear: </li>
                        <ul>
                          <li> add a short title,</li>
                          <li>
                            then take a clear picture of the box and its
                            contents.{" "}
                          </li>
                          <li>
                            In the description, mention that you are not the
                            owner.
                          </li>
                        </ul>
                        <li>
                          {" "}
                          <b>
                            <u>
                              Please refrain from using offensive, racist,
                              sexists, obscene, vulgar or any discriminatory
                              language, images and symbols.{" "}
                            </u>
                          </b>{" "}
                        </li>
                        <li> Click “Add Box”!</li>

                        <li>
                          If you’re using your mobile phone and are unable to
                          post something you may need to enable your location
                          settings and privacy settings.{" "}
                        </li>
                      </ol>
                    </Row>
                  </Container>
                  <BoxesSldies></BoxesSldies>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
        <CardBody></CardBody>
        <Footer></Footer>
      </div>
    );
  }
}

export default HowTo;
