FROM ibmcom/ibmnode:latest

#RUN apt-get install -y nodejs npm

WORKDIR /app
# Install app dependencies
COPY . /app
RUN cd /app; npm install; npm prune --production
ENV NODE_ENV production
#ENV PORT 4000

EXPOSE 80
CMD [ "npm","start" ]
