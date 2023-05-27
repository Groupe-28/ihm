# Use a Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the application code
COPY . .

# Set the command to run your server
CMD ["yarn", "start"]
