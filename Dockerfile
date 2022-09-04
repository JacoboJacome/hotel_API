FROM node:14
RUN mkdir -p /opt/app
COPY hotel_api/ .
RUN npm install
RUN npm install --save pm2
EXPOSE 3000
CMD [ "npm", "run", "pm2" ]