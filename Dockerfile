FROM node

ENV PORT=3000 \
    MONGO_URL="mongodb+srv://ralekaru_db_user:vedant111@cluster0.ri6l8li.mongodb.net/?appName=Cluster0"

RUN mkdir -p urlShortner

RUN npm install

COPY . /urlShortner

CMD ["node", "/urlShortner/app.js"]

