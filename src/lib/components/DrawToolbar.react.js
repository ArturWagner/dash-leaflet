import { Map, TileLayer, FeatureGroup, Circle, withLeaflet } from 'react-leaflet';
import EditControl from "./EditControl.react";
import PropTypes from 'prop-types';
import '../../assets/drawToolbar.css';
import React, { Component } from 'react';
class DrawToolbar extends Component {
    render() {
        const nProps = Object.assign({}, this.props);
        return (
            <EditControl {...nProps}/>
        )
    }
}

export default withLeaflet(DrawToolbar)

DrawToolbar.propTypes = {
        /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,
    /**
     * Value
     */
    value: PropTypes.string,
    /**
     * Function
     */
    onCreated: PropTypes.func,
    /**
     * Function
     */
    onMounted: PropTypes.func,
    /**
     * Shape
     */
    draw: PropTypes.shape({
      polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }),
    /**
     * Editable
     */
    edit: PropTypes.shape({
      edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      allowIntersection: PropTypes.bool,
    }),
    /**
     * Position
     */
    position: PropTypes.oneOf([
      'topright',
      'topleft',
      'bottomright',
      'bottomleft'
    ]),
    /**
     * Leaflet
     */
    leaflet: PropTypes.shape({
      map: PropTypes.instanceOf(Map),
      layerContainer: PropTypes.shape({
        addLayer: PropTypes.func.isRequired,
        removeLayer: PropTypes.func.isRequired
      })
    }),
    // Events
    setProps: PropTypes.func
};