#!/usr/bin/bash
#installs an SSL certificate on an HAproxy load balancer.

sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install certbot
sudo service haproxy stop
sudo certbot certonly --standalone -d myartisan.works -d www.myartisan.works -d \
     -d artisan-01.myartisan.works -d artisan-02.myartisan.works -d artisan-lb.myartisan.works
sudo echo "Please note the path and expiration date of your certificate\n"
sudo mkdir -p /etc/haproxy/certs
DOMAIN='myartisan.works'
sudo -E bash -c 'cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/haproxy/certs/"$DOMAIN".pem'
sudo chmod -R go-rwx /etc/haproxy/certs

sudo sed -i '/mode http/a \ \ bind *:443 ssl crt /etc/haproxy/certs/myartisan.works.pem' /etc/haproxy/haproxy.cfg
sudo sed -i '/bind \*:443 ssl crt \/etc\/haproxy\/certs\/myartisan.works.pem/a \ \ acl letsencrypt-acl path_beg /.well-known/acme-challenge/' /etc/haproxy/haproxy.cfg
sudo sed -i '/acl letsencrypt-acl path_beg \/.well-known\/acme-challenge\//a \ \ use_backend letsencrypt-backend if letsencrypt-acl' /etc/haproxy/haproxy.cfg

sudo sed -i '/server artisan-02 174.138.88.222:80 check/a backend letsencrypt-backend' /etc/haproxy/haproxy.cfg
sudo sed -i '/^backend letsencrypt-backend $/a \ \ server letsencrypt 127.0.0.1:54321' /etc/haproxy/haproxy.cfg

sudo haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl restart haproxy.service
