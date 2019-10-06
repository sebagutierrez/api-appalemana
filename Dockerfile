FROM node:11-alpine
WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start:dev" ]