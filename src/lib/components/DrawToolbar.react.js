import { Map, TileLayer, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import PropTypes from 'prop-types';
import '../../assets/drawToolbar.css';
import React, { Component } from 'react';

function addLayer(event, layers){
    let layerId = event.layer._leaflet_id
    let layerType = 'None'
    let layerCoords = {}
    let layerRadius = undefined
    if(event.layer._mRadius){
        layerType = 'Circle'
        layerCoords = event.layer._latlng
        layerRadius = event.layer._mRadius
    }else{
        if (Array.isArray(event.layer._latlngs)){
            layerType = 'Polygon'
            layerCoords = event.layer._latlngs[0]
        }else{
            layerType = 'Marker'
            layerCoords = event.layer._latlng
        }
    }
    layers[layerId] = {
        id: layerId,
        type: layerType,
        coords: layerCoords,
        radius: layerRadius
    }
    return layers
}

function removeLayer(event, layers){
    let layerId = event.layer._leaflet_id
    layers[layerId] = undefined
    return layers
}

export default class DrawToolbar extends Component {
    // layerDisplay(obj){
    //     obj.layer._renderer._rootGroup.style.display = 'none'
    // }
    render() {
        const { id } = this.props
        const storage = `${id}_layers_storage`
        window.sessionStorage.setItem(storage, '{}')
        return (
            <div id={id}>
                <FeatureGroup
                onlayeradd={function(event) {
                    let layers = JSON.parse(window.sessionStorage.getItem(storage))
                    layers = addLayer(event, layers)
                    window.sessionStorage.setItem(storage, JSON.stringify(layers))
                }}
                onlayerremove={function(event) {
                    let layers = JSON.parse(window.sessionStorage.getItem(storage))
                    layers = removeLayer(event, layers)
                    window.sessionStorage.setItem(storage, JSON.stringify(layers))
                }}
                >
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