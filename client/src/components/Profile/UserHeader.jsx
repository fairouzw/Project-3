import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" +
              require("../Home/icons/christian-l-dpWdMEUcKZY-unsplash.jpg") +
              ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          {/* <span className="mask bg-gradient-default opacity-96" /> */}
          {/* Header container */}
          <div className="marge-userheader">
            <Container className="d-flex align-items-center" fluid>
              <Row>
                <Col>
                  {/* <h5 className="display-3 text-white">
                    <br></br>Hi 
                    {this.props.userName}.
                  </h5> */}
                  {/* <p className="text-white mt-0 mb-5">Stay free. Stay fresh.</p> */}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default UserHeader;
