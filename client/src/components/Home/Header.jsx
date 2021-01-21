import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div
          className="header  pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(" +
              require("../Home/icons/julia-solonina-J-g3s9eHsMM-unsplash.jpg") +
              ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <Container fluid>
            <div className="header-body">
              <Row></Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
