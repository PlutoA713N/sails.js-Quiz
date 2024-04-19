# Use the official Node.js image as a base
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Sails.js globally
RUN npm install -g sails

# Install Dependencies
RUN npm install


# Copy the rest of the application
COPY . .

# Expose port 1337 
EXPOSE 1337

# Commands to run the application
CMD ["sails", "lift"]
