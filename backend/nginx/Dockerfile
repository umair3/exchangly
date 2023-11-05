FROM nginx:1.19.0-alpine
RUN mkdir /app
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY redirect.conf /etc/nginx/conf.d/redirect.conf
COPY ssl /etc/ssl
WORKDIR /app