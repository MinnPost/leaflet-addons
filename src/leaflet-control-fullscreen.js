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

    this._createButton('Fullscreen', className + '-button', container, map.fullscreen, map);

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
  
  _toggleFullscreen: function() {
    
    
  }
});

L.Map.include({
  fullscreen: function (event) {
    if (!this._isFullscreen) {
    
      // Need to manually change the position as it is inline
      this._container.style.position = 'fixed';
      L.DomUtil.addClass(this._container, 'leaflet-fullscreen');
      this._isFullscreen = true;

      L.DomEvent.addListener(document, 'keyup', this.fullscreen, this);

      this.fire('enterFullscreen');

    } 
    else {
      // Esc
      if (event.type === 'keyup' && event.keyCode !== 27) {
        return;
      }

      // Need to manually change the position as it is inline
      this._container.style.position = 'relative';
      L.DomUtil.removeClass(this._container, 'leaflet-fullscreen');
      this._isFullscreen = false;

      L.DomEvent.removeListener(document, 'keyup', this.fullscreen);

      this.fire('exitFullscreen');

    }

    this.invalidateSize();

    return this;
  }
});

})(L, window);