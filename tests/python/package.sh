#!/bin/bash

export TAG="hbot"

if [[ "$1" == "-b" ]]; then
    docker build -t $TAG -f ./DockerFile .
elif [[ "$1" == "-r" ]]; then
    docker-compose -f ./docker-compose.yml run $TAG
fi
