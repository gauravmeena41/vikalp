#!/bin/bash
aws ecr get-login-password --profile sama --region ap-south-1 | docker login --username AWS --password-stdin 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server
docker tag vikalp-web-server:latest 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server:latest
docker tag vikalp-web-server:latest 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server:development
docker tag vikalp-web-server:latest 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server:production
docker push 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server:latest
docker push 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server:development
docker push 031084219351.dkr.ecr.ap-south-1.amazonaws.com/vikalp-server:production