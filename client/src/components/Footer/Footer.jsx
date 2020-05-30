import React from "react";
import { NavLink as RRNavLink, withRouter } from "react-router-dom";


// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2018{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://www.creative-tim.com?ref=adr-auth-footer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Creative Tim
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      exact to="/how-to"
                    >
                     How it Works
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/fairouzw/Project-3"
                      target="_blank"
                    >
                       Git Hub Repo
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/lenalau"
                      target="_blank"
                    >
                      Lena Lau
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.linkedin.com/in/fairouz-k%C3%B6hler-west-1aa0b160/"
                      target="_blank"
                    >
                      Fairouz West
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default withRouter(Footer);
