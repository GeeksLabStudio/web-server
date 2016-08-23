#!/bin/bash

HOST=dev@192.168.0.10
PORT=228
WWW=/www/test

echo 'QQ'
echo 'THis is a script for uploading build '
echo ''

# echo 'Building sources...'
# run gulp build task
# gulp build

echo 'Deploying to the '$HOST' server...'

# via scp uploading dist folder
scp -r -P $PORT ./dist/* $HOST:$WWW
echo 'Done :)'