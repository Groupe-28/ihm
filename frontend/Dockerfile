# Use the official Node.js LTS (Long Term Support) base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
