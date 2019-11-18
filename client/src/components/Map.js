import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

class Map extends Component {
    state = {
        viewport: {
            width: "100vw",
            height: "100vh",
            latitude: 52.520008,
            longitude: 13.404954,
            zoom: 11
        },
        userLocation: {}
    };

    customizeMap = viewport => { this.setState({ viewport: viewport }) }

    setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let setUserLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            let newViewport = {
                height: "100vh",
                width: "100vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 16
            };
            this.setState({
                viewport: newViewport,
                userLocation: setUserLocation
            });
        });
    }

    render() {
        console.log(this.state.userLocation)

        return (<div>
            <div>

                <ReactMapGL {...this.state.viewport}
                    onViewportChange={this.customizeMap}
                    mapStyle="mapbox://styles/los-lena/ck34ysrdu0fd61cqhbk6ai0fc"
                    mapboxApiAccessToken="pk.eyJ1IjoibG9zLWxlbmEiLCJhIjoiY2szNHllYzI5MTZsOTNubzI1emZ2aHFiaSJ9.v7gsBidhvQm2T5EOb_GcGA">
                    {Object.keys(this.state.userLocation).length !== 0 ? (
                        <Marker
                            latitude={this.state.userLocation.lat}
                            longitude={this.state.userLocation.long}
                        >
                            <img className="location-icon" src={require('./icon.png')} alt="location" />
                        </Marker>
                    ) : (
                            <div>Empty</div>
                        )}
                </ReactMapGL>
                <button onClick={this.setUserLocation}>Get Location!</button>
            </div>

        </div>
        );
    }
}

export default Map;