FROM node:20-alpine as base
WORKDIR /app

FROM base as dev
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base as build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
