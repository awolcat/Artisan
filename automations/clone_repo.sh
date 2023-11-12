#!/usr/bin/bash
# script clones the artisan repo
if [ $# -ne 1 ]
then
    echo "USAGE: clone_repo PAT"
    exit
fi

pat="$2"
git clone https://"$pat"@github.com/awolcat/artisan.git
