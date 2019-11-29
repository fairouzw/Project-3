import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";

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

  // selectedPost = () => {
  //   // e.preventDefault()
  //   this.props.getSelectedPost(this.state.selectedSpot) 
   
  // }

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
                  {this.state.selectedSpot !== null ? (
                     <Popup
                     latitude={this.state.selectedSpot.location.lat}
                      longitude={this.state.selectedSpot.location.long}
                      onClose={this.closePopup}
                      onClick={this.setSelectedSpot}
                      >
                      <div>
                      <img className="location-icon" src={this.state.selectedSpot.imgUrl} alt="" />
                     <p>{this.state.selectedSpot.postname}</p>
                     </div>
                      </Popup>
                      ) : null}
        </ReactMapGL>
        </div>
    );
  }
}

export default Map;
