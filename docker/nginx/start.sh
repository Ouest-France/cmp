#!/bin/bash

case "$MODE" in
  fastcgi-phpfpm-cmp)
    cp /etc/nginx/conf.d/default.fastcgi-phpfpm-cmp.conf.disabled /etc/nginx/conf.d/default.conf
    ;;

esac

if [ ! -z "$SERVER_NAME" ]; then
  sed -i 's/server_name  localhost;/server_name  '"$SERVER_NAME"';/g' /etc/nginx/conf.d/default.conf
fi

if [ ! -z "$WORKER_PROCESSES" ]; then
  sed -i 's/worker_processes  4;/worker_processes  '"$WORKER_PROCESSES"';/g' /etc/nginx/nginx.conf
fi

exec nginx -g "daemon off;"
