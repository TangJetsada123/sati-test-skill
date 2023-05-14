# syntax=docker/dockerfile:1

# Start your image with a node base image
FROM node:18-alpine as build

# Create an application directory
RUN mkdir -p /app

# Set the /app directory as the working directory for any command that follows
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run","dev"]