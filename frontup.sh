#!/bin/bash
echo -e '\e[1m\e[34mPulling code from remote..\e[0m\n'
git pull origin master
echo -e '\e[1m\e[34m\nChecking for new npm version and installing..\e[0m\n'
npm install -g npm
echo -e '\e[1m\e[34m\nInstalling required packages..\e[0m\n'
npm install
echo -e '\e[1m\e[34m\nBuilding code..\e[0m\n'
npm run build
echo -e '\e[1m\e[34m\nRestarting service..\e[0m\n'
pm2 restart all
echo -e '\n\e[1m\e[34mDeployment successful\e[0m'