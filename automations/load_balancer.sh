#!/usr/bin/env bash
# Installs and configures a HAproxy load-balancer for artisan servers
sudo apt update -y
sudo apt-get install --no-install-recommends software-properties-common -y
sudo add-apt-repository ppa:vbernat/haproxy-2.4 -y
sudo apt-get install haproxy=2.4.\* -y
sudo cp /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.bak

sudo sed -i 's/ENABLED=.*/ENABLED=1/' /etc/default/haproxy
sudo sed -i -e '\#errorfile 504 /etc/haproxy/errors/504.http# {
   a\
\nfrontend http
}' /etc/haproxy/haproxy.cfg
sudo sed -i '/frontend http/a \ \ bind *:80' /etc/haproxy/haproxy.cfg
sudo sed -i '/bind \*:80/a \ \ mode http' /etc/haproxy/haproxy.cfg
sudo sed -i '/mode http/a \ \ default_backend web_backend' /etc/haproxy/haproxy.cfg
sudo sed -i '/default_backend web_backend/a backend web_backend' /etc/haproxy/haproxy.cfg
sudo sed -i '/^backend web_backend$/a \ \ balance roundrobin' /etc/haproxy/haproxy.cfg
sudo sed -i '/balance roundrobin/a \ \ server artisan-01 174.138.88.103 check' /etc/haproxy/haproxy.cfg
sudo sed -i '/server artisan-01 174.138.88.103 check/a \ \ server artisan-02 174.138.88.222' /etc/haproxy/haproxy.cfg
sudo systemctl restart haproxy.service
