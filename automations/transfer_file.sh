#!/usr/bin/env bash
#script transfers a file from our client to the home directory of a server.
if [ "$#" -ne 4 ]
then
    echo "Usage: 0-transfer_file PATH_TO_FILE IP USERNAME PATH_TO_SSH_KEY"
    exit
fi

path="$1"
ip="$2"
username="$3"
ssh_privkey="$4"

scp -r "$ssh_privkey" -o StrictHostKeyChecking=no "$path" "$username"@"$ip":~
