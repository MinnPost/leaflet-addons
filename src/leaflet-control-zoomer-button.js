/**
 * Control that will zoom to a specific place.
 */
(function(L, w, undefined) {

L.Control.ZoomerButton = L.Control.extend({
  options: {
    position: 'topleft',
    place: [0, 0],
    zoom: 4,
    title: 'Zoom into a place'
  },

  onAdd: function (map) {
    this._map = map;
    var className = 'leaflet-control-zoomer-button';
    var container = L.DomUtil.create('div', className);

    this._createButton(this.options.title, className + '-button', container, this._zoomMap, this);
    
    return container;
  },
  
  _createButton: function (title, className, container, fn, context) {
    var link = L.DomUtil.create('a', className, container);
    link.href = '#';
    link.title = title;
    
    L.DomEvent.addListener(link, 'click', L.DomEvent.stopPropagation);
    L.DomEvent.addListener(link, 'click', L.DomEvent.preventDefault);
    L.DomEvent.addListener(link, 'click', fn, context);
    
    return link;
  },

  _zoomMap: function (event) {
    this._map.setView(this.options.place, this.options.zoom);
  }
});

})(L, window);