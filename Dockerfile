FROM node:10.1.0-stretch

ADD . /app
WORKDIR /app

RUN npm install
RUN npm install -g grunt-cli

CMD ["node", "app.js"]