#!/usr/bin/env node

var palette = require('palette')
  , fs = require('fs')
  , Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas
  , ctx = canvas.getContext('2d')
  , path = process.argv[2]
  , xml2js = require('xml2js');

if (!path) {
  console.error('Usage: '+process.argv[1]+' <image>');
  process.exit(1);
}

var img = new Image;
var imageInfo = {colours: [], url: path, year: 0};

img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height + 50;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  getColours();
};

img.src = path;

function getColours() {
  var colors = palette(canvas);
  colors.forEach(function(color){
    var r = color[0]
      , g = color[1]
      , b = color[2]
      , val = r << 16 | g << 8 | b
      , str = '#' + val.toString(16);
    imageInfo.colours.push(str);
  });
  parseDate();
}

function parseDate() {
  var parser = new xml2js.Parser();
  fs.readFile(path + '.txt', function(err, data) {
      parser.parseString(data, function (err, result) {
          imageInfo.year = result['@'].object_date_begin;
          console.log(imageInfo);
      });
  });
}

