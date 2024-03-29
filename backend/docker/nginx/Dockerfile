FROM nginx:1.21.6-alpine as app

FROM app as app_prod

COPY docker/nginx/http.conf /etc/nginx/conf.d/default.conf

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

FROM app as app_dev
