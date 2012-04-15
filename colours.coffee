# Grab the five most prominent colors from an image
getColors = ->
  palette = require "palette"
  colors = palette(canvas)

  colors.forEach (color) ->
    r = color[0]
    g = color[1]
    b = color[2]
    val = r << 16 | g << 8 | b
    str = "#" + val.toString(16)
    imageInfo.colors.push str
  
  parseDate()

# Grab the century of an image
parseDate = ->
  xml2js = require "xml2js"
  parser = new xml2js.Parser()

  fs = require "fs"
  fs.readFile path + ".xml", (err, data) ->
    parser.parseString data, (err, result) ->
      imageInfo.year = result["@"].object_date_begin
      console.log JSON.stringify(imageInfo) + ","

path = process.argv[2]

unless path
  console.error "Usage: " + process.argv[1] + " <image>"
  process.exit 1

Canvas = require "canvas"
Image = Canvas.Image
canvas = new Canvas
ctx = canvas.getContext "2d"

imageInfo = 
  colors: []
  url: path
  year: 0

img = new Image

img.onload = ->
  canvas.width = img.width
  canvas.height = img.height + 50
  ctx.fillStyle = "white"
  ctx.fillRect 0, 0, canvas.width, canvas.height
  ctx.drawImage img, 0, 0
  getColors()

img.src = path