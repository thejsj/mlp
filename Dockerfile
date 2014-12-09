FROM ubuntu:trusty
MAINTAINER thejsj

# Install base packages
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
# ESSENTIALS
RUN apt-get -yq install curl git software-properties-common wget emacs
# Node JS
RUN add-apt-repository ppa:chris-lea/node.js && apt-get update
RUN apt-get -yq install nodejs
# MySQL
RUN apt-get -yq install mysql-client
# NPM
RUN npm install -g mocha gulp bower
# Remove Source Lists
RUN rm -rf /var/lib/apt/lists/*

#
# Add App
#
WORKDIR /app/

ADD package.json /app/package.json
RUN npm install
ADD bower.json /app/bower.json
RUN bower install --allow-root

ADD client /app/client
ADD server /app/server
ADD run.sh /run.sh
RUN chmod -R 777 /run.sh
RUN chmod +x /run.sh
ADD gulpfile.js /app/gulpfile.js
RUN gulp

EXPOSE 80
WORKDIR /
ENTRYPOINT ["/run.sh"]
