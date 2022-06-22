FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive

# install common dev packages
RUN apt update && apt install -y \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg-agent \
	software-properties-common \
	sudo \
	git

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
	apt update && apt install -y nodejs

# create user nordle
RUN useradd -m -s /bin/bash nordle && \
	usermod -a -G sudo nordle && \
	echo "nordle ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers


USER nordle
WORKDIR /home/nordle
