FROM node:20-alpine

WORKDIR /urlShortner

ENV PORT=3000

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]