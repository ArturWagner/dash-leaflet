/* eslint no-magic-numbers: 0 */
import React, { Component } from 'react';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import { DrawToolbar } from '../lib'
import { Map, TileLayer, SuperCluster, Marker, DrawToolbar, FeatureGroup } from '../lib';
//import LeafletMarkerClusterGroup from '../lib/LeafletMarkerClusterGroup';
import regeneratorRuntime from "regenerator-runtime";
import EditControl from "../lib/components/EditControl.react";
// import FeatureGroup from "../lib/components/FeatureGroup.react";


var geojson = {
    "type": "FeatureCollection", "features": [
        {
            "type": "Feature", "geometry": { "type": "Point", "coordinates": [10, 56] },
            "properties": { "cluster": false, "tooltip": "tooltip" }
        },
        {
            "type": "Feature", "geometry": { "type": "Point", "coordinates": [10, 57] },
            "properties": { "cluster": false, "popup": "popup" }
        },
        {
            "type": "Feature", "geometry": { "type": "Point", "coordinates": [10, 55] },
            "properties": { "cluster": false, "marker_options": { "opacity": 0.5 } }
        }
    ]
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: 'hello'
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
                    style={{ height: '50vh' }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <DrawToolbar id='map' value='abc'></DrawToolbar> */}
                    <FeatureGroup
                        // onlayeradd={function (event) {
                        //     // let layers = JSON.parse(window.sessionStorage.getItem(storage))
                        //     // layers = addLayer(event, layers)
                        //     value = 'ventura topzera'
                        // }}
                        // onlayerremove={
                        //     function (event) {
                        //         // let layers = JSON.parse(window.sessionStorage.getItem(storage))
                        //         // layers = removeLayer(event, layers)
                        //         value = 'ventura topzera removido'
                        //     }}
                    >
                        <DrawToolbar
                            position='topright'
                            onEdited={this._onEditPath}
                            onCreated={this._onCreate}
                            onDeleted={this._onDeleted}
                            setProps={this.setProps}
                            value={this.state.value}
                            draw={{
                                rectangle: false
                            }}
                        />
                    </FeatureGroup>
                </Map>
            </div>
        )
    }
}

export default App;