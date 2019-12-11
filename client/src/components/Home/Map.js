import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl, NavigationControl } from "react-map-gl";
// import Loader from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Map extends Component {

  state = {
    viewport: {
      width: "100%",
      height: "600px",
      latitude: 52.5035239,
      longitude: 13.407602899999999,
      zoom: 11,
      borderRadius: "inherit"
    },
    userLocation: {},
    isLoading: true
  };

  customizeMap = viewport => {
    this.setState({
      viewport: {
        ...viewport,
        width: "100%",
      }
    });
  };

  closePopup = () => {
    this.props.setSelectedPost(null)
  };

  // componentDidMount = () => {
  //   this.setState({
  //     isLoading: false }
  //   )
  // }

  render() {
    return (
      <div  >
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this.customizeMap}
          mapStyle="mapbox://styles/los-lena/ck34ysrdu0fd61cqhbk6ai0fc"
          mapboxApiAccessToken="pk.eyJ1IjoibG9zLWxlbmEiLCJhIjoiY2szNHllYzI5MTZsOTNubzI1emZ2aHFiaSJ9.v7gsBidhvQm2T5EOb_GcGA"
       
        >
          {this.props.posts.map((post, idx) => {
            return (
              <div key={idx}>
                <Marker
                  key={post._id}
                  latitude={post.location.lat}
                  longitude={post.location.long}
                >
                  <img
                    onClick={() => {
                      this.props.setSelectedPost(post);
                    }}
                    src={require("./icons/google-location.jpg")}
                    alt="location-icon"
                    className="marker-icon"
                  />
                </Marker>
              </div>
            );
          })}

          <GeolocateControl
            positionOption={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            
          />
          <NavigationControl/>
          {this.props.selectedPost !== null ? (
            <Popup
              latitude={this.props.selectedPost.location.lat}
              longitude={this.props.selectedPost.location.long}
              onClose={this.closePopup}
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

export default Map;
