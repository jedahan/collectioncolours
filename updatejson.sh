#!/usr/bin/env zsh
local dumpfile='dump/ImageInfo.json'
echo '[' > $dumpfile
for image in data/*jpg; do ./colours.js $image >> $dumpfile; done
echo ']' >> $dumpfile