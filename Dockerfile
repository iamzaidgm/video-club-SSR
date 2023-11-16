FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 90

CMD PORT=90 DATABASE_URL=mongodb:mongodb://localhost:27017/video-club npm start
