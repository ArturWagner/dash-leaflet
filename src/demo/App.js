/* eslint no-magic-numbers: 0 */
import React, { Component } from 'react';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import { DrawToolbar } from '../lib'
import { Map, TileLayer, SuperCluster, Marker, DrawToolbar } from '../lib';
//import LeafletMarkerClusterGroup from '../lib/LeafletMarkerClusterGroup';
import regeneratorRuntime from "regenerator-runtime";

var geojson = {"type": "FeatureCollection", "features": [
    {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 56]}, 
    "properties": {"cluster": false, "tooltip": "tooltip"}},
        {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 57]}, 
    "properties": {"cluster": false, "popup": "popup"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [10, 55]}, 
    "properties": {"cluster": false, "marker_options": {"opacity": 0.5}}}
    ]}

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <Map id='map' center={[51.505, -0.09]} zoom={1}
                    onClick={this.handleClick}
                    onLocationfound={this.handleLocationFound}
                    ref={this.mapRef}
                    style={{ height: '50vh'}}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DrawToolbar id='map'></DrawToolbar>
                </Map>
            </div>
        )
    }
}

export default App;