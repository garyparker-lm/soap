# Use the node 8 image on dockerhub as our base image
FROM node:8.0.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose 8080; the port out app is expected to run on
EXPOSE 8080

# Execute node start
CMD [ "npm", "start" ]
