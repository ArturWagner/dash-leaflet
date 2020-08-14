 
import { PropTypes } from 'prop-types';
import Draw from 'leaflet-draw'; // eslint-disable-line
import '../../assets/draw.css';
import isEqual from 'lodash-es/isEqual';

import { MapControl, withLeaflet } from 'react-leaflet';
import leaflet, { Map, Control } from 'leaflet';

const eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop',
};

class EditControl extends MapControl {
  static propTypes = {
    ...Object.keys(eventHandlers).reduce((acc, val) => {
      acc[val] = PropTypes.func;
      return acc;
    }, {}),
    id: PropTypes.string,
    data: PropTypes.string,
    onCreated: PropTypes.func,
    onMounted: PropTypes.func,
    draw: PropTypes.shape({
      polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }),
    edit: PropTypes.shape({
      edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      allowIntersection: PropTypes.bool,
    }),
    position: PropTypes.oneOf([
      'topright',
      'topleft',
      'bottomright',
      'bottomleft'
    ]),
    leaflet: PropTypes.shape({
      map: PropTypes.instanceOf(Map),
      layerContainer: PropTypes.shape({
        addLayer: PropTypes.func.isRequired,
        removeLayer: PropTypes.func.isRequired
      })
    })
  };

  createLeafletElement(props) {
    return createDrawElement(props);
  }

  onDrawCreate = (e) => {
    const { onCreated } = this.props;
    const { layerContainer } = this.props.leaflet;
    layerContainer.addLayer(e.layer);
    this.props.setProps({ data: addLayer(e, this.props.data)})
    onCreated && onCreated(e);
  };

  componentDidMount() {
    super.componentDidMount();
    const { map } = this.props.leaflet;
    const { onMounted } = this.props;

    for (var key in eventHandlers) {
      map.on(eventHandlers[key], (evt) => {
        let handlers = Object.keys(eventHandlers).filter(handler => eventHandlers[handler] == evt.type)
        if (handlers.length == 1) {
          let handler = handlers[0]
          if (handler == 'onEdited'){
            this.props.setProps({ data: addLayer(evt, this.props.data)})
          } else if (handler == 'onDeleted'){
            this.props.setProps({ data: removeLayer(evt, this.props.data)})
          }
          this.props[handler] && this.props[handler](evt)
        }
      });
    }

    map.on(leaflet.Draw.Event.CREATED, this.onDrawCreate);

    onMounted && onMounted(this.leafletElement);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    const { map } = this.props.leaflet;

    map.off(leaflet.Draw.Event.CREATED, this.onDrawCreate);

    for (const key in eventHandlers) {
      if (this.props[key]) {
        map.off(eventHandlers[key], this.props[key]);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // super updates positions if thats all that changed so call this first
    super.componentDidUpdate(prevProps);

    if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
      return false;
    }

    const { map } = this.props.leaflet;

    this.leafletElement.remove(map);
    this.leafletElement = createDrawElement(this.props);
    this.leafletElement.addTo(map);

    return null;
  }
  render(){
    return null
  }

}

function createDrawElement(props) {
  const { layerContainer } = props.leaflet;
  const { draw, edit, position } = props;
  const options = {
    edit: {
      ...edit,
      featureGroup: layerContainer
    }
  };

  if (draw) {
    options.draw = { ...draw };
  }

  if (position) {
    options.position = position;
  }

  return new Control.Draw(options);
}

function formatLayer(event){
  if(event.layer){
    return [event.layer]
  }else{
    let layers = []
    for (const [key, value] of Object.entries(event.layers._layers)) {
      layers.push(value)
    }
    return layers
  }
}

function addLayer(event, data) {
  let layers = JSON.parse(data)
  let eventLayers = formatLayer(event)
  eventLayers.forEach(eventLayer => {
    let layerId = eventLayer._leaflet_id
    let layerType = 'None'
    let layerCoords = {}
    let layerRadius = undefined
    if (eventLayer._mRadius) {
      layerType = 'Circle'
      layerCoords = eventLayer._latlng
      layerRadius = eventLayer._mRadius
    } else {
      if (Array.isArray(eventLayer._latlngs)) {
        layerType = 'Polygon'
        layerCoords = eventLayer._latlngs[0]
      } else {
        layerType = 'Marker'
        layerCoords = eventLayer._latlng
      }
    }
    layers[layerId] = {
      id: layerId,
      type: layerType,
      coords: layerCoords,
      radius: layerRadius
    }
  })
  return JSON.stringify(layers)
}

function removeLayer(event, data) {
  let layers = JSON.parse(data)
  let eventLayers = formatLayer(event)
  eventLayers.forEach(eventLayer => {
    let layerId = eventLayer._leaflet_id
    delete layers[layerId]
  });
  return JSON.stringify(layers)
}

export default withLeaflet(EditControl);

EditControl.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,
    /**
     * Value
     */
    data: PropTypes.string,
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