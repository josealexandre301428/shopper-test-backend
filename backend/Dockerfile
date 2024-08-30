FROM node:19-bullseye

WORKDIR /app-backend

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run"]
CMD ["dev"]