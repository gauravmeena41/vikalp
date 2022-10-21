#!/bin/bash

# Build the container
docker build -f ./../WebServer.Dockerfile ../ -t vikalp-web-server:latest --platform=linux/arm64
# docker system prune -f