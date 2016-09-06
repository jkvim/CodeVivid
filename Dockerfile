FROM node:6.5
MAINTAINER jkvim jkvim@outlook.com
RUN mkdir -p /opt/nodejs
ADD . /opt/nodejs
WORKDIR /opt/nodejs
RUN npm install
RUN npm run build
EXPOSE 3001
