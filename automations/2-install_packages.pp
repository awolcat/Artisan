# This manifest installs some basic packages on an ubuntu server

exec { 'apt-update':
  command => 'apt-get update',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
}

exec { 'apt-upgrade':
  command => 'apt-get upgrade -y',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Exec['apt-update'],
}

package { ['python3', 'nginx', 'git', 'gunicorn', 'python3-pip', 'emacs', 'tmux', 'pkg-config',
	'libmysqlclient-dev', 'mysql-server']:
  ensure  => installed,
  require => Exec['apt-upgrade'],
}
