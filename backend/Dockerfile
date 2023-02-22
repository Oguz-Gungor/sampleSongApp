FROM node:12

WORKDIR /app

COPY ./package.json ./env .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3001

# CMD npm start
CMD [ "node", "server.js" ]