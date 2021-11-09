#!/bin/sh

cd /home/node/app

node ace migration:run

node ace db:seed

npm run dev
