FROM node:16

EXPOSE 8080

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build


CMD ["npm","start"]