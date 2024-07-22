FROM node:20

WORKDIR /app

COPY  . .
EXPOSE 3000
RUN npm i

CMD [ "npm", "run", "start:prod" ]