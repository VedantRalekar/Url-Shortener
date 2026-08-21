FROM node

ENV PORT=3000 

RUN mkdir -p urlShortner

COPY package*.json ./

RUN npm install

COPY . /urlShortner

CMD ["node", "/urlShortner/app.js"]

