# The base node stage
FROM node:21-alpine3.18 as base
WORKDIR /usr/src/app
COPY package*.json .

# Development node stage
FROM base as development
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]

# Development node stage
FROM base as production
RUN npm install --ony-production && npm cache clean --force
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
