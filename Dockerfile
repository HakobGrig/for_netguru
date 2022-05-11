FROM node:16

WORKDIR /usr/src/app

COPY ./package.json ./yarn.lock ./tsconfig.json ./
RUN yarn install

COPY ./src ./src
RUN yarn build


CMD ["node", "src/a.js"]
