# Use an official Node.js runtime as the base image. node:lts
FROM node:20.12.2

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image 
COPY . .

# Make port 8082 available to the world outside this container
EXPOSE 8082

# Run the app when the container launches. CMD ["node", "server.js"]
CMD ["npm", "start"]