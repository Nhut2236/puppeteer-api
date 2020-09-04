FROM node:12.10

WORKDIR /app

COPY package*.json ./

RUN apt-get update

RUN npm install

COPY . /app

EXPOSE 4000

CMD ["npm", "start"]