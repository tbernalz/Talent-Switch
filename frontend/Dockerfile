# Use an official Node.js runtime as the base image. node:lts
FROM node:20.12.2

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Copy .env file
COPY .env .

# Expose port (e.g., 3000) on which the app runs 
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]