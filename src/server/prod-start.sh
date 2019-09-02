#!/bin/bash
#nvm use v12.8.0
export NODE_ENV=prod; nohup node app-dpat-cluster.js &> app.out &

# nohup
