# Use a specific, stable version of Node.js
FROM node:16-alpine

# Install Python and build tools
RUN apk add --no-cache python3 make g++ 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install npm dependencies based on the package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to allow external access
EXPOSE 5000

# Specify the command to run the application when the container starts
CMD ["npm", "start"]
