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

# create user makeabugreport
RUN useradd -m -s /bin/bash makeabugreport && \
	usermod -a -G sudo makeabugreport && \
	echo "makeabugreport ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers


USER makeabugreport
WORKDIR /home/makeabugreport
