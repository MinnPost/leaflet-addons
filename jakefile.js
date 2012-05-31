/**
 * @file
 * Jakefile for building leaflet addons
 *
 * Install:
 *   npm install -g jake
 *   npm install jshint
 *   npm install uglify-js
 *
 * Run 'jake' in repository root
 */
var fs = require('fs');
var path = require('path');
var jshint = require('jshint').JSHINT;
var uglifyjs = require('uglify-js');

desc('Check Leaflet source for errors with JSHint');
task('lint', function () {
  var files = [];
  var errors = [];
  var f;
  var i;

  // Get JS files in src
  var list = fs.readdirSync('src');
  for (f in list) {
    if (list[f].match(/.js/i)) {
      files.push('src/' + list[f]);
    }
  }
    
  // Check JShint
  for (i in files) {
    src = fs.readFileSync(files[i], 'utf8');
    jshint(src);
    
    if (jshint.errors.length > 0) {
      errors.push(jshint.errors);
    }
  }
  
  if (errors.length > 0) {
    console.log(errors);
    fail('Did not pass JSHint.');
    return false;
  }
  else {
    return true;
  }
});

desc('Combine and compress Leaflet source files');
task('build', ['lint'], function () {
  var sourcePath = path.join(__dirname, 'src');
  var sourceImages = path.join(sourcePath, 'images');
  var jsPath = path.join(__dirname, 'dist/leaflet-addons.js');
  var jsPathCompressed = path.join(__dirname, 'dist/leaflet-addons.min.js');
  var cssPath = path.join(__dirname, 'dist/leaflet-addons.css');
  var cssIEPath = path.join(__dirname, 'dist/leaflet-addons.ie.css');
  var imagesDir = path.join(__dirname, 'dist/images');
  var distDir = path.join(__dirname, 'dist');
  var allFiles = fs.readdirSync(sourcePath);
  var i;
  var output;

  // Put together JS
  output = '';
  for (i in allFiles) {
    if (allFiles[i].match(/.js/i)) {
      output += fs.readFileSync(sourcePath + '/' + allFiles[i], 'utf8') + '\r\n\r\n';
    }
  }
  if (output !== '') {
    fs.writeFileSync(jsPath, output);
  }

  // Put together Compressed JS
  output = '';
  for (i in allFiles) {
    if (allFiles[i].match(/.js/i)) {
      output += fs.readFileSync(sourcePath + '/' + allFiles[i], 'utf8') + '\r\n\r\n';
    }
  }
  if (output !== '') {
    var parsed = uglifyjs.parser.parse(output);
    var compressed = uglifyjs.uglify.ast_mangle(parsed);
    var compressed = uglifyjs.uglify.ast_squeeze(parsed);
    var compressed = uglifyjs.uglify.gen_code(parsed);
    fs.writeFileSync(jsPathCompressed, compressed);
  }

  // Put together CSS
  output = '';
  for (i in allFiles) {
    if (allFiles[i].match(/[^.ie].css/i)) {
      output += fs.readFileSync(sourcePath + '/' + allFiles[i], 'utf8') + '\r\n\r\n';
    }
  }
  if (output !== '') {
    fs.writeFileSync(cssPath, output);
  }

  // Put together IE CSS
  output = '';
  for (i in allFiles) {
    if (allFiles[i].match(/.ie.css/i)) {
      output += fs.readFileSync(sourcePath + '/' + allFiles[i], 'utf8') + '\r\n\r\n';
    }
  }
  if (output !== '') {
    fs.writeFileSync(cssIEPath, output);
  }

  // Copy images
  jake.rmRf(imagesDir);
  jake.cpR(sourceImages, distDir);
  
});

task('default', ['build']);