FROM ibmcom/ibmnode:latest


WORKDIR /app
# Install app dependencies
COPY . /app
RUN cd /app; npm install; npm prune --production
ENV NODE_ENV production
ENV MONGO_URL mongodb://169.57.206.164:27017/local
EXPOSE 80
CMD [ "npm","start" ]
