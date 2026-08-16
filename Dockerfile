FROM node:26-alpine

WORKDIR /app

RUN apk add --no-cache build-base python3 sqlite-dev sqlite

COPY package-lock.json package.json ./
RUN npm ci --omit=dev

COPY . .

RUN npm run build
RUN npm run migrate-up

ENV NODE_ENV=production

RUN addgroup app && adduser -G app -D app
RUN chown -R app:app /app

USER app

CMD [ "npm", "start" ]