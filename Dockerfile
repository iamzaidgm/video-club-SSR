FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 90

CMD PORT=90 DATABASE_URL=mongodb://mongo:H2g-GhAbBA53C3bE5BecgA1ffFGD4Bca@roundhouse.proxy.rlwy.net:18499 npm start
