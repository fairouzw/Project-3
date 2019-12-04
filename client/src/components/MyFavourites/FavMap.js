import React, { Component } from 'react'

class FavMap extends Component {
  state = {
    viewport: {
      width: "inherit",
      height: "350px",
      latitude: 52.5035239,
      longitude: 13.407602899999999,
      zoom: 11
    },
    userLocation: {}
  };

  // componentDidMount() {
  //   this.getSinglePost();
  // }

  // getSingleProject = () => {
  //   const { params } = this.props.match;
  //   axios
  //     .get(`http://localhost:5000/api/post/${params.id}`, {
  //     })
  //     .then(responseFromApi => {
  //       const thePost = responseFromApi.data;
  //       this.setState(thePost);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  customizeMap = viewport => {
    this.setState({ viewport: viewport });
  };

  closePopup = () => {
    this.props.setSelectedPost(null)
  };
  render() {
    return (
      <div >
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={this.customizeMap}
          mapStyle="mapbox://styles/los-lena/ck34ysrdu0fd61cqhbk6ai0fc"
          mapboxApiAccessToken="pk.eyJ1IjoibG9zLWxlbmEiLCJhIjoiY2szNHllYzI5MTZsOTNubzI1emZ2aHFiaSJ9.v7gsBidhvQm2T5EOb_GcGA"
        >
         
                <Marker
                  key={post._id}
                  latitude={post.location.lat}
                  longitude={post.location.long}
                >
                  <img

                    onClick={() => {
                      this.props.setSelectedPost(post);
                    }}
                    src={require("./icons/attraction-15.svg")}
                    alt="location"
                  />
                </Marker>
    
            );
          })}

          <GeolocateControl
            positionOption={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
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
    )
  }
}

export default FavMap
