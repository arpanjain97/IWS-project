import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div className="SuperAwesomePin">{text}</div>;
 
const Marker = props => {
  return   <>
    <div className="pin"></div>
    <div className="pulse"></div>
    </>
  
}
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
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyDHz0VA78I3aGWBmTTZRwhKMCwotZ62sfs'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
          


          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;