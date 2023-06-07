# Use the official Node.js LTS (Long Term Support) base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json yarn.lock ./

# Install the application dependencies
RUN yarn

# Copy the application source code
COPY . .

RUN yarn prisma generate

# Build the application

RUN yarn build

# Expose the application port
EXPOSE 8000

# Start the development server
CMD ["node", "dist/main"]
