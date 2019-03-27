import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={this.props.latitude} lng={this.props.longitude} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
