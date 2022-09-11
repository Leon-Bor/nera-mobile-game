FROM node:16-alpine As Builder 

WORKDIR /app

COPY . . 

RUN npm install
RUN npm run build
RUN npm prune --production 

FROM nginx:alpine 

WORKDIR /app 
 
COPY --from=Builder /app/dist /usr/share/nginx/html 
RUN true
EXPOSE 80