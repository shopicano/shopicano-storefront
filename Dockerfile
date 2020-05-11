FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY public public
COPY src src
COPY babel.config.js babel.config.js
COPY .env .env
COPY value-replacer value-replacer
COPY run.sh run.sh

# build app for production with minification
RUN npm install
RUN npm run build

FROM node:lts-alpine

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
RUN npm install -g http-server

WORKDIR /app

COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/value-replacer /app/value-replacer
COPY --from=builder /app/run.sh /app/run.sh

EXPOSE 8080
CMD [ "./run.sh" ]
