import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl, NavigationControl } from "react-map-gl";

class FavMap extends Component {
  state = {
    viewport: {
      width: "inherit",
      height: "600px",
      latitude: this.props.selectedPost.location.lat,
      longitude: this.props.selectedPost.location.long,
      zoom: 16
    },
    userLocation: {},
    selectedPost: false,
    postname: "",
    imgUrl: ""
  };

  customizeMap = viewport => {
    this.setState({
      viewport: {
        ...viewport,
        width: "100%",
      }
    });
  };

  showPopUp = () => [
    this.setState({
      selectedPost: !this.state.selectedPost
    })
  ];

  render() {

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
            zoom="18"
          />
            <NavigationControl/>
          {this.state.selectedPost === false ? (
            <Popup
              latitude={this.state.viewport.latitude}
              longitude={this.state.viewport.longitude}
              onClose={this.showPopUp}
            >
              <div>
                <img className="location-icon" src={this.props.selectedPost.imgUrl} alt="" />
                <p>{this.props.selectedPost.postname}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
}

export default FavMap;
