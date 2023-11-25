FROM eclipse-temurin:11

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y inotify-tools dos2unix
# Install jq
RUN apt-get update && apt-get install -y jq

ENV HOME=/app

RUN mkdir -p $HOME

WORKDIR $HOME