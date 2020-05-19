import React, { Component } from "react";
import logo from '../Home/icons/spotbox-logo.svg';
import "./Logo.css";

class Logo extends Component {

    render() {
        return (
            <div>
                <img className="logo-start" src={logo} alt="Welcome to Spotbox!" title="Welcome to Spotbox!" id="_logo" />
            </div >
        );
    }
}

export default Logo;





