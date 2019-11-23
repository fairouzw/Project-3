import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

class Map extends Component {
  state = {
    viewport: {
      width: "50vw",
      height: "50vh",
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 11
    },
    userLocation: {},
    selectedSpot: null
  };

  customizeMap = viewport => {
    this.setState({ viewport: viewport });
  };

  // setUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     let setUserLocation = {
  //       lat: position.coords.latitude,
  //       long: position.coords.longitude
  //     };
  //     let newViewport = {
  //       height: "70vh",
  //       width: "70vw",
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       zoom: 16
  //     };
  //     this.setState({
  //       viewport: newViewport,
  //       userLocation: setUserLocation
  //     });
  //   });
  // };

  setSelectedSpot = object => {
    this.setState({
      selectedSpot: object
    });
  };

  popUpHandler = e => {
    console.log("target", e.target);
  };

  closePopup = () => {
    this.setState({
      selectedSpot: null
    });
  };

  render() {
    // console.log(this.state.userLocation);
    // console.log(this.props.posts);

    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this.customizeMap}
          mapStyle="mapbox://styles/los-lena/ck34ysrdu0fd61cqhbk6ai0fc"
          mapboxApiAccessToken="pk.eyJ1IjoibG9zLWxlbmEiLCJhIjoiY2szNHllYzI5MTZsOTNubzI1emZ2aHFiaSJ9.v7gsBidhvQm2T5EOb_GcGA"
        >
          {this.props.posts.map(post => {
            return (
              <div>
                <Marker
                  key={post._id}
                  latitude={post.location.lat}
                  longitude={post.location.long}
                >
                  <img

                    onClick={() => {
                      this.setSelectedSpot(post);
                    }}
                    src={require("./attraction-15.svg")}
                    alt="location"
                  />
                </Marker>
              </div>
            );
          })}

          {this.state.selectedSpot !== null ? (
            <Popup
              latitude={this.state.selectedSpot.location.lat}
              longitude={this.state.selectedSpot.location.long}
              onClose={this.closePopup}
              onClick={this.popUpHandler}
            >
              <p>{this.state.selectedSpot.postname}</p>
              <img className="location-icon" src={this.state.selectedSpot.imgUrl} alt="" />
            </Popup>
          ) : null}

          {/* {Object.keys(this.state.userLocation).length !== 0 ? (
              <Marker
                latitude={this.state.userLocation.lat}
                longitude={this.state.userLocation.long}
              >
                <img
                  className="location-icon"
                  src={require("./icon.png")}
                  alt="location"
                />
              </Marker>
            ) : (
              <div>Empty</div>
            )} */}
        </ReactMapGL>
        <button onClick={this.setUserLocation}>Get Location!</button>
      </div>
    );
  }
}

export default Map;
