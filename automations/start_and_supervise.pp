#This manifest configures supervisor for a running instance of gunicorn
#supervisor lets us run it in the background and allows us to setup monitoring

file { 'supervisor_config':
       path    => '/etc/supervisor/conf.d/artisan.conf',
       ensure  => present,
       owner   => 'habeebdindi',
       group   => 'habeebdindi',
       mode    => '0755',
       content =>
       "[program:artisan]
command=/home/habeebdindi/artisan/venv-artisan/bin/gunicorn -b localhost:8000 -w 2 artisan:app
directory=/home/habeebdindi/artisan
user=habeebdindi
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
	",
}

exec { 'reload_config_file':
     command => 'supervisorctl reload',
     path    => '/usr/bin:/usr/sbin:/bin:/sbin',
     require => File['supervisor_config'],
}