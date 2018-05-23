FROM node:10.1.0-stretch

ADD . /app
WORKDIR /app

RUN npm install
RUN ./node_modules/.bin/grunt
# RUN npm install -g grunt-cli

CMD ["node", "app.js"]