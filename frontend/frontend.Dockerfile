FROM --platform=linux/amd64 node:18-alpine AS development

ARG REACT_APP_API_BASE_URL

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install
COPY . /code
RUN REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} npm run build

FROM --platform=linux/amd64 nginx:1.23.2-alpine

COPY --from=development /code/build /usr/share/nginx/html

COPY nginx/conf/default.conf /etc/nginx/conf.d/
