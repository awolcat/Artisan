#!/usr/bin/bash
# installs puppet and its dependencies
sudo apt-get install -y ruby=1:2.7+1 --allow-downgrades
sudo apt-get install -y ruby-augeas
sudo apt-get install -y ruby-shadow
sudo apt-get install -y puppet
sudo gem install puppet-lint
