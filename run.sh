#!/bin/sh

file_to_replece=$(find /app/dist/js/ -name 'app.*.js')
echo $file_to_replece

./value-replacer --in $file_to_replece --out $file_to_replece --query VUE_APP_SHOPICANO_URL --value $SHOPICANO_BACKEND_URL

http-server dist
