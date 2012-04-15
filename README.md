# Collection Colours

A visualisation of color usage over time. Thanks to the Brooklyn Museum's awesome data.

## Usage
  `updatejson.sh` is a small wrapper to call `colours.js`

  `colours.js` takes an image and its metadata and gets the 5 most used colors

  `count.js` mapreduces the output from `colours.js` and dumps color frequency for the time periods

## ToDo

  Create streamgraph and stacked bar graph
  Switch data dump to json
  Hit live api

## Requirements

  Data dump of images from brooklyn museum + XML version of the metadata.