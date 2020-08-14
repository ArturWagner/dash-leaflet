# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class EditControl(Component):
    """An EditControl component.


Keyword arguments:
- draw (dict; optional): draw has the following type: dict containing keys 'polyline', 'polygon', 'rectangle', 'circle', 'marker'.
Those keys have the following types:
  - polyline (dict | boolean; optional)
  - polygon (dict | boolean; optional)
  - rectangle (dict | boolean; optional)
  - circle (dict | boolean; optional)
  - marker (dict | boolean; optional)
- edit (dict; optional): edit has the following type: dict containing keys 'edit', 'remove', 'poly', 'allowIntersection'.
Those keys have the following types:
  - edit (dict | boolean; optional)
  - remove (dict | boolean; optional)
  - poly (dict | boolean; optional)
  - allowIntersection (boolean; optional)
- position (a value equal to: 'topright', 'topleft', 'bottomright', 'bottomleft'; optional)
- leaflet (dict; optional): leaflet has the following type: dict containing keys 'map', 'layerContainer'.
Those keys have the following types:
  - map (optional)
  - layerContainer (dict; optional): layerContainer has the following type: dict containing keys 'addLayer', 'removeLayer'.
Those keys have the following types:
  - addLayer (required)
  - removeLayer (required)
- id (string; optional)
- value (string; optional)"""
    @_explicitize_args
    def __init__(self, onCreated=Component.UNDEFINED, onMounted=Component.UNDEFINED, draw=Component.UNDEFINED, edit=Component.UNDEFINED, position=Component.UNDEFINED, leaflet=Component.UNDEFINED, id=Component.UNDEFINED, value=Component.UNDEFINED, **kwargs):
        self._prop_names = ['draw', 'edit', 'position', 'leaflet', 'id', 'value']
        self._type = 'EditControl'
        self._namespace = 'dash_leaflet'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['draw', 'edit', 'position', 'leaflet', 'id', 'value']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(EditControl, self).__init__(**args)
