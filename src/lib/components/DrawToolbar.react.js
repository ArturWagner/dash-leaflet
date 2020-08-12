import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import PropTypes from 'prop-types';
import '../../assets/drawToolbar.css';
import React, { Component } from 'react';

export default class DrawToolbar extends Component {
    render() {
        return (
            <div id={this.id}>
                <FeatureGroup>
                    <EditControl
                    position='topright'
                    onEdited={this._onEditPath}
                    onCreated={this._onCreate}
                    onDeleted={this._onDeleted}
                    draw={{
                        rectangle: false
                    }}
                    />
                </FeatureGroup>
            </div>
        )
    }
}

DrawToolbar.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,
};