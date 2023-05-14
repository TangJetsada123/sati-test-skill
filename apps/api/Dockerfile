FROM node:14-alpine

# Set working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json ./
# Install dependencies

RUN npm install

# Copy the entire project directory to /app
COPY . .

RUN npm run build

# Start the api
CMD [ "npm", "run", "dev" ]
