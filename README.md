# Leaflet Addons

Various addons for [Leaflet](leaflet.cloudmade.com/).

## Usage

Include the following in your page (with the regular Leaflet scripts).

 - ```dist/leaflet-addons.min.js```
 - ```dist/leaflet-addons.css```
 - ```dist/leaflet-addons.ie.css```
 
## Implements

 - Fullscreen control.  Based from [this pull request](https://github.com/CloudMade/Leaflet/pull/603).
     - Simply include in your JS: ```map.addControl(new L.Control.Fullscreen());```
 
 - Zoomer Button control.  This is simply a button that will zoom/pan into a place.
     - Simply include in your JS: ```map.addControl(new L.Control.ZoomerButton());```
     - Options: ```place, zoom, title```
 
## Building

1. Install: ```npm install -g jake; npm install jshint; npm install uglify-js@1.x;```
1. Run form repository root: ```jake```