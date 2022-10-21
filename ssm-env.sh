#!/bin/bash
aws ssm get-parameter --with-decryption --name "APP_DEV_ENV" --region "ap-south-1" --query 'Parameter.Value' --output text |
while read line
  do
    echo $line >> .env
  done
