#!/usr/bin/bash
#This script sets up a new user

if [ $# -ne 1 ]
then
    echo "USAGE: setup_new_user USERNAME"
    exit
fi

adduser "$1"
usermod -aG sudo "$1"
rsync --archive --chown="$1":"$1" ~/.ssh /home/"$1"
