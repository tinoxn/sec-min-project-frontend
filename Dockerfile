# Use an official Node.js runtime as a parent image
FROM node:16 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use a lightweight Nginx image to serve the built app
FROM nginx:alpine as production-stage

# Copy the built app from the build-stage to the Nginx public directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]