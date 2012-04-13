#!/usr/bin/env node

var imageInfo = require('./imageInfo');
var mapR = require('map-reduce');

// map each year to list of colors
mapR({
  on: imageInfo,
  map: function(emit, value, key) {
  	if(value.year > 0)
  		emit(value.colours, value.year);
	emit.next();
  },
  reduce: sum,
  done: check
})
  
function check(err,results){
	if(!err) {
		console.log(results);
		mapR({
		  on: results,
		  map: function(emit, value, key) {
		  	for (var i = value.length - 1; i >= 0; i--) {
		  		emit(key,value[i]);
		  	};
		  	emit.next();
		  },
		  reduce: add,
		  done: log
		})
	}
}

function sum(collection, value, key){
    collection = collection || {};
    collection[key] = collection[key] || []
    for (var i = value.length - 1; i >= 0; i--) {
    	collection[key].push(value[i]);
    };
    return collection;
}

function add(collection, year, color){
    collection = collection || {};
    collection[year] = collection[year] || [];
    collection[year][color] = collection[year][color] || 0;
	collection[year][color] += 1;
    return collection;
}

function log(err, results) {
	if (!err)
  		console.log(results);
}