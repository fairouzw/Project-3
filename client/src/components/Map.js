import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
// import { relative } from "path";

class Map extends Component {
  state = {
    viewport: {
      width: "inherit",
      height: "350px",
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 12
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

  closePopup = () => {
    this.setState({
      selectedSpot: null
    });
  };

  render() {
    // console.log(this.state.userLocation);
    // console.log(this.props.posts);

    return (
      <div >
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

          <GeolocateControl 
          positionOption={{enableHighAccuracy: true}}
          trackUserLocation={true}
          />

          {/* {Object.keys(this.state.userLocation).length !== 0 ? (
            <Marker
            latitude={this.state.userLocation.lat}
            longitude={this.state.userLocation.long}
            >
                <img
                  className="location-icon"
                  src={require("./icons8-map-pin-48.png")}
                  alt="location"
                  />
              </Marker>
             ) : (
               <div><p>Set your current location</p></div>
               )}  */}
              {/* <button 
              onClick={this.setUserLocation}
              color="primary"
              size="sm"
              >  
                 <i className="ni ni-pin-3" /> My location</button> */}
            
                  {this.state.selectedSpot !== null ? (
                     <Popup
                     latitude={this.state.selectedSpot.location.lat}
                      longitude={this.state.selectedSpot.location.long}
                      onClose={this.closePopup}
                      onClick={this.setSelectedSpot}
                      >
                      <img className="location-icon" src={this.state.selectedSpot.imgUrl} alt="" />
                     <p>{this.state.selectedSpot.postname}</p>
                      </Popup>
                      ) : null}
        </ReactMapGL>
        </div>
    );
  }
}

export default Map;
