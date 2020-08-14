/* eslint no-magic-numbers: 0 */
import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup, EditControl } from '../lib';

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
            data: '{}'
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
                    <FeatureGroup
                    >
                        <EditControl
                            position='topright'
                            onEdited={this._onEditPath}
                            onCreated={this._onCreate}
                            onDeleted={this._onDeleted}
                            setProps={this.setProps}
                            data={this.state.data}
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