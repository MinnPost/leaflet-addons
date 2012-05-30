/**
 * Full screen control for Leaflet
 */
(function(L, window, undefined) {

L.Control.Fullscreen = L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    map._isFullscreen = false;
    
    var className = 'leaflet-control-fullscreen';
    var container = L.DomUtil.create('div', className);

    this._createButton('Fullscreen', '', container, map.fullscreen, map);

    return container;
  },

  _createButton: function (title, className, container, fn, context) {
    var link = L.DomUtil.create('a', className, container);
    link.href = '#';
    link.title = title;

    L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', fn, context);

    return link;
  }
});

})(L, window);