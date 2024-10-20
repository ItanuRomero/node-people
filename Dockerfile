FROM node:18.12.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm install -g tsx

CMD ["tsx", "./src/index.ts"]
