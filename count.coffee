imageInfo = require './imageInfo'
mapR = require 'map-reduce'

mapR 
  on: imageInfo
  map: colorByYear
  reduce: colorFrequency
  done: log

colorByYear = (emit, image, key) ->
  emit(image.colors, image.year) if image.year > 0
  emit.next()

colorFrequence = (collection, colors, year) ->
  collection ||= {}
  collection[year] ||= []
  collection[year][color] ||= 0
  collection[year][color]++
  collection

log = (err, results) ->
  if err
    console.log err
  else
    console.log JSON.stringify results