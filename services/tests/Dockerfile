# create build image
FROM node:11 AS build

# set woring directory
RUN mkdir /build
WORKDIR /build

# install app dependencies
ADD package.json .
RUN npm install

# create a slim node image for running app
FROM node:11-slim

# set woring directory in slim image
RUN mkdir /tests
WORKDIR /tests

# copy deps and code to the slim node image
COPY --from=build /build /tests
ADD . /tests

# run tests
CMD ["node", "./node_modules/.bin/mocha", "--recursive"]