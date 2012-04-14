#!/usr/bin/env zsh
echo '[' > imageInfo.json
for image in img/*/*jpg; do ./colours.js $image >> imageInfo.json; done
echo ']' >> imageInfo.json
