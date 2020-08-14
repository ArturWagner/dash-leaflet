import React, { Component } from 'react';
import { FeatureGroup as LeafletFeatureGroup, withLeaflet } from 'react-leaflet';
import { PropTypes } from 'prop-types';


class FeatureGroup extends Component {
    render() {
        const nProps = Object.assign({}, this.props);
        return (
            <LeafletFeatureGroup {...nProps}/>
        )
    }
}

export default withLeaflet(FeatureGroup)

FeatureGroup.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,
};

