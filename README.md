# Collection Colours

A visualisation of color usage over time. Thanks to the Brooklyn Museum's awesome data.

## Usage
  `updatejson` is a small wrapper to call `colours`

  `colours` takes an image and its metadata and gets the 5 most used colors

  `count` mapreduces the output from `colours` and dumps color frequency for the time periods

## ToDo

  * Create streamgraph and stacked bar graph
  * Switch data dump to json
  * Hit live api
  *  Get rid of updatejson (handle directory entries in `colours`)
  *  Put all todo items on github issues

## Requirements

  Data dump of images from brooklyn museum + XML version of the metadata.