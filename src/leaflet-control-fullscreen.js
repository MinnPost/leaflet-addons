/**
 * Full screen control for Leaflet
 */
(function(L, window, undefined) {

L.Control.Fullscreen = L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    this._map = map;
    var className = 'leaflet-control-fullscreen';
    var container = L.DomUtil.create('div', className);

    this._createButton('Fullscreen', className + '-button', container, this._toggleFullScreen, this);
    
    // Handle ESC key
    L.DomEvent.addListener(document, 'keyup', L.DomEvent.stop);
    L.DomEvent.addListener(document, 'keyup', this._exitFullScreen, this);
    
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

  _toggleFullScreen: function (event) {
    this._map.fullscreen();
  },
  
  _exitFullScreen: function (event) {
    if (event && event.type === 'keyup' && event.keyCode === 27) {
      this._map.fullscreen(false);
    }
  }
});

L.Map.include({
  // Add fullscreen function, use force to turn on or off forcibly.
  fullscreen: function(force) {
    var fsClass = 'leaflet-fullscreen';
    var classFS = L.DomUtil.hasClass(this._container, fsClass);
    var mapFS = this._isFullscreen;
    var isFS = false;
    
    // Determine fullscreen from priority of values
    if (force === undefined) {
      isFS = mapFS || classFS || false;
    }
    else {
      isFS = !force;
    }
  
    if (!isFS) {
      // Need to manually change the position as it is inline
      this._container.style.position = 'fixed';
      L.DomUtil.addClass(this._container, fsClass);
      this._isFullscreen = true;
      this.fire('enterFullscreen');
    } 
    else {
      // Need to manually change the position as it is inline
      this._container.style.position = 'relative';
      L.DomUtil.removeClass(this._container, fsClass);
      this._isFullscreen = false;
      this.fire('exitFullscreen');
    }

    this.invalidateSize();
    return this;
  }
});

})(L, window);