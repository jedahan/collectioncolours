#!/usr/bin/env zsh
echo '[' > imageInfo.json
for image in img/000/*jpg; do ./colours.js $image >> imageInfo.json; done
echo ']' >> imageInfo.json
