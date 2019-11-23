#!/usr/bin/env bash

# Install node and pm2 tools
if [ ! -d /root/.nvm ]
then
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install --lts
npm install -g pm2
pm2 startup systemd

# Create Application Directory
pm2 stop all
rm -rf $APP_FOLDER
mkdir $APP_FOLDER

# Move files into the directory
cp -r $APP_ARTIFACT/* $APP_FOLDER
cd $APP_FOLDER
mkdir uploads

# Setup Dependencies
npm install

# Start PM2 process
pm2 start ./bin/www
pm2 save

