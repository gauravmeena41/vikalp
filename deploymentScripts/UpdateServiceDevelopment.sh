#!/bin/bash
aws ecs update-service --cluster vikalp-dev-CLUSTER --service sama-vikalp-dev --force-new-deployment --profile vikalp --region ap-south-1