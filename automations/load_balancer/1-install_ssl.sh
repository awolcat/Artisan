#!/usr/bin/bash
#installs an SSL certificate on an HAproxy load balancer.

sudo snap install --classic certbot
sudo service haproxy stop
sudo certbot certonly --standalone --preferred-challenges http --http-01-port 80 -d myartisan.works -d www.myartisan.works
sudo echo "Please note the path and expiration date of your certificate\n"
sudo mkdir -p /etc/haproxy/certs
DOMAIN='myartisan.works'
sudo sh -c "cat /etc/letsencrypt/live/${DOMAIN}/fullchain.pem /etc/letsencrypt/live/${DOMAIN}/privkey.pem > /etc/haproxy/certs/${DOMAIN}.pem"
sudo chmod -R go-rwx /etc/haproxy/certs

sudo sed -i '/mode http/a \ \ bind *:443 ssl crt /etc/haproxy/certs/myartisan.works.pem' /etc/haproxy/haproxy.cfg
sudo sed -i '/bind \*:443 ssl crt \/etc\/haproxy\/certs\/myartisan.works.pem/a \ \ redirect scheme https code 301 if !{ ssl_fc }' /etc/haproxy/haproxy.cfg
sudo sed -i '/redirect scheme https code 301 if !{ ssl_fc }/a \ \ acl letsencrypt-acl path_beg /.well-known/acme-challenge/' /etc/haproxy/haproxy.cfg
sudo sed -i '/acl letsencrypt-acl path_beg \/.well-known\/acme-challenge\/$/a \ \ use_backend letsencrypt-backend if letsencrypt-acl' /etc/haproxy/haproxy.cfg

sudo sed -i '/server artisan-02 174.138.88.222:80 check/a backend letsencrypt-backend' /etc/haproxy/haproxy.cfg
sudo sed -i '/^backend letsencrypt-backend$/a \ \ server letsencrypt 127.0.0.1:54321' /etc/haproxy/haproxy.cfg

sudo haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl restart haproxy.service

#renew ssl automatically
sudo cat <<EOF | sudo tee /usr/local/bin/renew.sh > /dev/null
#!/bin/sh

SITE=myartisan.works

# move to the correct let's encrypt directory
cd /etc/letsencrypt/live/$SITE

# cat files to make combined .pem for haproxy
cat fullchain.pem privkey.pem > /etc/haproxy/certs/$SITE.pem

# reload haproxy
service haproxy reload
EOF

sudo chmod u+x /usr/local/bin/renew.sh


#update certbot config
sed -i 's/^http01_port = .*/http01_port = 54321/' /etc/letsencrypt/renewal/myartisan.works.conf
#test it
sudo certbot renew --dry-run

#create crontab to handle renewal script
sudo echo 'select your desired editor and use this crontab entry: 30 2  * * 1 /usr/bin/certbot renew --renew-hook "/usr/local/bin/renew.sh" >> /var/log/le-renewal.log'
