#!/bin/bash
docker run -it --restart on-failure	-p 3000:3000 -e "NODE_ENV" vikalp-web-server:latest