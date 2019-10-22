FROM nginx:1.17.0

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/default.fastcgi-phpfpm-cmp.conf /etc/nginx/conf.d/default.fastcgi-phpfpm-cmp.conf.disabled
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/cert /etc/nginx/ssl.d

COPY docker/nginx/start.sh /start.sh

CMD ["/bin/bash", "/start.sh"]
