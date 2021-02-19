# create build image
FROM node:11 AS build

# set woring directory
RUN mkdir /build
WORKDIR /build

# install app dependencies
ADD package.json .
ADD package-lock.json .

# BUILD_ENV is a build env parameter. default is "prod"
ARG BUILD_ENV=prod
# decides whether to build including dev dependencies or not
RUN if [ "$BUILD_ENV" = "prod" ] ; then echo "installing only prod deps ..."; npm install --only=prod ; else npm install ; fi

# add source code
ADD ./src ./src
ADD ./migrations ./migrations
ADD ./gruntfile.js .
ADD ./tsconfig.json .
ADD ./.sequelizerc .

# compiling the project
RUN npm run build

# create a slim node image for running app
FROM node:11-slim

# set woring directory in slim image
RUN mkdir /app
WORKDIR /app

# copy deps and code to the slim node image
COPY --from=build /build /app

# adding entrypoint
COPY entrypoint .
RUN chmod +x ./entrypoint

ENTRYPOINT ["./entrypoint"]

# start app
CMD ["npm", "start-dev"]
