FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i -g nodemon

COPY . .

EXPOSE 3000

# Command to run the application
CMD ["nodemon", "app.js", "--host", "0.0.0.0"]
