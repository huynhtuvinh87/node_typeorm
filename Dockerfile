FROM node:18.18.1

WORKDIR /usr/app

COPY package.json ./

RUN npm install
COPY . .
ENV PORT=3000

# Expose the port specified by the environment variable
EXPOSE $PORT

CMD [ "npm", "start" ]