FROM node:10.0.0-slim
ENV APP_ROOT /usr/src/express

WORKDIR $APP_ROOT
COPY package.json $APP_ROOT
RUN npm install

COPY . $APP_ROOT
EXPOSE 3000
CMD ["npm", "start"]
