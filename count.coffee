imageInfo = require './imageInfo'
mapR = require 'map-reduce'

# turn image information into a list of years and frequencies
mapR 
  on: imageInfo
  map: (emit, image, key) ->
    emit(image.colors, image.year) if image.year > 0
    emit.next()
  
  reduce: sum
  done: check

check = (err, results) ->
  unless err
    mapR 
      on: results
      map: (emit, values, key) ->
        emit(key, value) for value in values
        emit.next()
      
      reduce: add
      done: log

sum = (collection, colors, year) ->
  collection ||= {}
  collection[year] ||= []
  collection[year].push color for color in colors
  collection

add = (collection, year, color) ->
  collection ||= {}
  collection[year] ||= []
  collection[year][color] ||= 0
  collection[year][color] += 1
  collection

log = (err, results) ->
  if err
    console.log err
  else
    console.log results