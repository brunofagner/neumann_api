FROM node:18-alpine
WORKDIR /usr/src/neumann_api
COPY package.json .
RUN npm install
COPY . .
CMD npm start