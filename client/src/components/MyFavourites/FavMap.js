import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import axios from "axios";
import { withRouter } from "react-router-dom";

class FavMap extends Component {
  state = {
    viewport: {
      width: "inherit",
      height: "350px",
      latitude: 52.5035239,
      longitude: 13.407602899999999,
      zoom: 11
    },
    userLocation: {},
    selectedPost: true,
    postname: "",
    imgUrl: ""
  };

  componentDidMount() {
    this.getSinglePost();
  }

  getSinglePost = () => {
    const id = this.props.match.params.id;
    console.log("params", id);
    axios
      .get(`/api/posts/${id}`)
      .then(response => {
        console.log("responsefromapi", response.data);
        this.setState({
          viewport: {
            width: "inherit",
            height: "350px",
            latitude: response.data.location.lat,
            longitude: response.data.location.long,
            zoom: 11
          },
          postname: response.data.postname,
          imgUrl: response.data.imgUrl
        });
      })
      .catch(err => {
        console.log("something went wrong", err);
      });
  };

  customizeMap = viewport => {
    this.setState({ viewport: viewport });
  };

  showPopUp = () => [
    this.setState({
      selectedPost: !this.state.selectedPost
    })
  ];

  render() {
    console.log("Mir", this.props);
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this.customizeMap}
          mapStyle="mapbox://styles/los-lena/ck34ysrdu0fd61cqhbk6ai0fc"
          mapboxApiAccessToken="pk.eyJ1IjoibG9zLWxlbmEiLCJhIjoiY2szNHllYzI5MTZsOTNubzI1emZ2aHFiaSJ9.v7gsBidhvQm2T5EOb_GcGA"
        >
          <Marker
            latitude={this.state.viewport.latitude}
            longitude={this.state.viewport.longitude}
          >
            <img
              onClick={this.showPopUp}
              src={require("../Home/icons/attraction-15.svg")}
              alt="location"
            />
          </Marker>

          <GeolocateControl
            positionOption={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          {this.state.selectedPost === false ? (
            <Popup
              latitude={this.state.viewport.latitude}
              longitude={this.state.viewport.longitude}
              onClose={this.showPopUp}
            >
              <div>
                <img className="location-icon" src={this.state.imgUrl} alt="" />
                <p>{this.state.postname}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
}

export default withRouter(FavMap);
