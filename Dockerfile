FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
