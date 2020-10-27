FROM debian:latest as base

RUN apt-get update
RUN apt-get install -y libsqlite3-dev autoconf automake gcc make

FROM base as unit-tester

RUN apt-get install -y gdb sqlite3 valgrind

FROM base as core
ARG VERSION

WORKDIR /
RUN test -n "${VERSION}"
ADD workouts-${VERSION}.tar.gz .
WORKDIR /workouts-${VERSION}/

RUN autoreconf -ivf
RUN ./configure
RUN make
# RUN make distcheck
RUN make install

FROM unit-tester
ARG VERSION

WORKDIR /build
COPY --from=core /workouts-${VERSION}/ /build/

RUN ./configure
RUN make check || cat test/unit/test-suite.log

FROM node:latest as integration-tester
ARG VERSION

USER node
WORKDIR /home/node/

COPY --from=core --chown=node:node /workouts-${VERSION}/workouts .
COPY --from=core --chown=node:node /workouts-${VERSION}/test/integration/index.js .
COPY --from=core --chown=node:node /workouts-${VERSION}/test/integration/package.json .
COPY --from=core --chown=node:node /workouts-${VERSION}/test/integration/package-lock.json .

RUN npm install

COPY --from=core /workouts-${VERSION}/test/integration/test/ test/

RUN npm test

FROM node:latest as builder
ARG VERSION

USER node
WORKDIR /home/node/

COPY --from=core --chown=node:node /workouts-${VERSION}/gui/ .

RUN npm install
RUN npm run build

FROM core

WORKDIR /data
COPY --from=builder /home/node/index.html .
COPY --from=builder /home/node/workouts.js .

RUN workouts --attr add lower
RUN workouts --attr add upper
RUN workouts --workout add "P90X - Kenpo X"
RUN workouts -w add "P90X - Kenpo X2"
RUN workouts toggle "P90X - Kenpo X" lower
RUN workouts toggle "P90X - Kenpo X2" upper
RUN workouts add "P90X - Kenpo X" 2020-07-01

ENTRYPOINT workouts-server