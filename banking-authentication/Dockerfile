FROM ibmcom/ibmnode:latest


WORKDIR /app
# Install app dependencies
COPY . /app
RUN cd /app; npm install; npm prune --production
ENV NODE_ENV production
#ENV PORT 3200

EXPOSE 80
CMD [ "npm","start" ]
