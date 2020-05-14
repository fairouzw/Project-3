import React, { Component } from "react";
import icon from '../../assets/img/icons/common/Coming-Soon-Google-Play.png';
import "./ComingSoonGooglePlay.css";

class ComingSoonGooglePlay extends Component {

    render() {
        return (
            <div>
                <img src={icon} title="Coming soon!" alt="Coming soon!" id="_google-play" />
            </div >
        );
    }
}

export default ComingSoonGooglePlay;


