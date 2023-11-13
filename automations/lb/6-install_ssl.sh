#!/usr/bin/bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d myartisan.works -d www.myartisan.works \
     -d artisan-01.myartisan.works -d artisan-02.myartisan.works -d artisan-lb.myartisan.works
