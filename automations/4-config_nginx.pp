# configures nginx for artisan with puppet

$user = $facts['user']

package { 'nginx':
  ensure => installed,
}

exec { 'check_status':
  command => 'systemctl status nginx; curl -4 icanhazip.com',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Service['nginx']
}

exec { 'create_artisan_folder':
  command => 'mkdir -p /var/www/myartisan.works/html',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
}

file { '/var/www/myartisan.works/html':
  ensure  => directory,
  recurse => true,
  owner   => $user,
  group   => $user,
  require => Exec['create_artisan_folder'],
}

file { '/var/www':
  ensure  => directory,
  recurse => true,
  mode    => '0755',
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
	add_header X-Served-By $hostname;
        
	root /var/www/myartisan.works/html;
        index index.html index.htm;

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
  require => File['/etc/nginx/sites-available/myartisan.works'],
}

#delete default symlink
file { '/etc/nginx/sites-enabled/default':
  ensure => absent,
  notify => Service['nginx'],
}

exec { 'test_nginx_configuration':
  command     => 'nginx -t',
  path        => '/usr/sbin:/usr/bin:/sbin:/bin',
  logoutput   => true,
  notify      => Service['nginx'],
}

service { 'nginx':
  ensure     => running,
  enable     => true,
  hasstatus  => true,
  hasrestart => true,
  require    => Package['nginx'],
}
