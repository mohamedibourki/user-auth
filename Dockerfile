# Use Node.js image with tag 21
FROM node:21

# Install build tools required for bcrypt
RUN apt-get update && \
    apt-get install -y build-essential

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json files
COPY package*.json /

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt module for the current architecture
RUN npm rebuild bcrypt --build-from-source

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]