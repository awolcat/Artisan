#!/usr/bin/bash
# sets up git identity on a machine
if [ $# -ne 2 ]
then
    echo "USAGE: setup_git_identity FULLNAME EMAIL"
fi

name="$1"
email="$2"
git config --global user.name "$name"
git config --global user.email "$email"
