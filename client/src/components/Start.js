import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
// import Background from './Fernsehturm_claudio-schwarz-purzlbaum-pN684G33h.jpg';

class Start extends Component {
  render() {
    return (
      <section className="landing-page">
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
          {/* // how to make the buttons transparent?? */}
          <Link to="/signup">
            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2">
              Sign up
          </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2">
              Login
          </button>
          </Link>
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
        </div>
      </section>
    )
  }
}

export default Start;
