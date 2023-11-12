# This manifest install some basic packages on an ubuntu server

exec { 'apt-update':
  command => 'apt-get upgrade',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
}

exec { 'apt-upgrade':
  command => 'apt-get upgrade -y',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Exec['apt-update'],
}

package { ['python3', 'nginx', 'git', 'gunicorn', 'python3-pip', 'emacs', 'tmux']:
  ensure  => installed,
  require => Exec['apt-upgrade'],
}
