#!/usr/bin/bash
#installs ssl certificate on a server

if [ $# -ne 1 ]
then
    echo "USAGE: install_ssl domain name (must have a valid A record to this server)"
fi

sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d "$1"
