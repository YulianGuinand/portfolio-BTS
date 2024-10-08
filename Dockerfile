FROM nginx:latest

RUN mkdir /usr/share/nginx/portfolio
WORKDIR /usr/share/nginx/portfolio

COPY ./docker.nginx.conf /etc/nginx/conf.d/default.conf

COPY . .


EXPOSE 80
