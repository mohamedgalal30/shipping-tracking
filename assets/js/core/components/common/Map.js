import React from 'react'
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

let options = {
    center: { lat: "", lng: "" },
    origin: { lat: "", lng: "" },
    destination: { lat: "", lng: "" }
}


class Map extends React.Component {
    componentWillMount() {
        const { origin, destination, center } = this.props;
        options.center = center || origin;
        options.origin = origin;
        options.destination = destination;
    }
    render() {
        return <MapWithADirectionsRenderer />
    }
}

export default Map;



const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAutXuonKtdFovmmmwYag1IW5PoYV8rvPY&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(options.origin.lat, options.origin.lng),
                destination: new google.maps.LatLng(options.destination.lat, options.destination.lng),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(options.center.lat, options.center.lng)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);