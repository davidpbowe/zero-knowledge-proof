FROM node:alpine as builder

WORKDIR /frontend

COPY ./package.json /frontend

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]