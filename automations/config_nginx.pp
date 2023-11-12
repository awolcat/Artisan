# configures nginx for artisan with puppet

package { 'nginx':
  ensure => installed,
}

service { 'nginx':
  ensure     => running,
  enable     => true,
  hasstatus  => true,
  hasrestart => true,
  require    => Package['nginx'],
}

exec { 'checK_status':
  command => 'systemctl status nginx; curl -4 icanhazip.com',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Service['nginx']
}

exec { 'create_artisan_folder':
  command => 'sudo mkdir /var/www/myartisan.works/html',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
}

file { '/var/www/myartisan.works/html':
  ensure  => directory,
  recurse => true,
  owner   => $::user,
  group   => $::user,
  require => Exec['create_artisan_folder'],
}

file { '/var/www':
  ensure  => directory,
  recurse => true,
  mode    => 0755,
}

file { '/var/www/myartisan.works/html/index.html':
  ensure  => present,
  content =>
  "<html>
    <head>
        <title>Welcome to myartisan.works!</title>
    </head>
    <body>
        <h1>Success! The myartisan.works server block is working!</h1>
    </body>
  </html>",
}

#create server block config by copying the default config
file { '/etc/nginx/sites-available/myartisan.works':
  ensure => present,
  content =>
  "server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/myartisan.works/html;
        index index.html index.htm index.nginx-debian.html;

        server_name myartisan.works www.myartisan.works;

        location / {
                try_files \$uri \$uri/ =404;
        }
   }",
}

#create symbolic link
file {'/etc/nginx/sites-enabled/myartisan.works':
  ensure  => link,
  target  => '/etc/nginx/sites-available/myartisan.works',
  require => File['/etc/nginx/sites-available/myartisan.works']
}
