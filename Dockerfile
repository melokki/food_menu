FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

COPY .env.example .env

COPY . /home/node/app/

EXPOSE 3333

RUN chmod +x start.sh

# ENTRYPOINT ["node","ace","serve","--watch"]
ENTRYPOINT ["/home/node/app/start.sh"]
