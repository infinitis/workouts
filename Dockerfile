FROM node:latest as builder
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

FROM node:latest as app
WORKDIR /home/node/app
ARG BUILD_CONFIGURATION
COPY --from=builder /app/node_modules ./node_modules/
COPY package.json .
COPY package-lock.json .
COPY src/ src/
COPY test/ test/
COPY index.html .
COPY webpack.config.js .
COPY webpack.dev.config.js .
COPY webpack.prod.config.js .

RUN if [ "${BUILD_CONFIGURATION}" = "prod" ]; \
	then npm run build; \
fi

# RUN npm run test

ENTRYPOINT npm run start