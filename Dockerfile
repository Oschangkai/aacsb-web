## Build Web
FROM node:12-alpine AS build
ARG PROFILE
ENV PROFILE $PROFILE
# Use /app as working directory to prevent build files be cleaned
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# install project dependencies
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN npm run build:${PROFILE}

## Start Web Service
FROM nginx:stable-alpine

COPY --from=build /app/dist /etc/nginx/static
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
