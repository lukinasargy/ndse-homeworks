FROM node:latest

WORKDIR /009-docker

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["node", "index.js"]