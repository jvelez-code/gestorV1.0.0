FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g npm@8.5.2
RUN npm link @angular/cli

COPY . /usr/src/app


RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine

#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=build-step /app/dist/reprotesFront /usr/share/nginx/html