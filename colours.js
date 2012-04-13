#!/usr/bin/env node

var palette = require('palette')
  , fs = require('fs')
  , Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas
  , ctx = canvas.getContext('2d')
  , path = process.argv[2]
  , out = '/tmp/out.png';

if (!path) {
  console.error('Usage: test <image>');
  process.exit(1);
}

var img = new Image;

img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height + 50;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  paintPalette();
  save();
};

img.src = path;

function paintPalette() {
  var x = 0;
  var colors = palette(canvas);
  var hexcolors = [];
  colors.forEach(function(color){
    var r = color[0]
      , g = color[1]
      , b = color[2]
      , val = r << 16 | g << 8 | b
      , str = '#' + val.toString(16);

    ctx.fillStyle = str;
    ctx.fillRect(x += 31, canvas.height - 40, 30, 30);
    hexcolors.push(str);
  });
  console.log(hexcolors);
}

function save() {
  fs.writeFile(out, canvas.toBuffer(), function(err){
    if (err) throw err;
    console.log('saved %s', out);
  });
}