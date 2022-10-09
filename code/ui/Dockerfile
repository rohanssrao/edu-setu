FROM node:latest

RUN mkdir -p /usr/src/ui

WORKDIR /usr/src/ui


COPY . /usr/src/ui/

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s" ,"build" ,"-l","3000"]