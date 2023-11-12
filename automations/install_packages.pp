exec { 'apt-update':
  command => 'sudo apt-get upgrade',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
}

exec { 'apt-upgrade':
  command => 'sudo apt-get upgrade -y',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Exec['apt-update'],
}

package { ['python3', 'nginx', 'git', 'gunicorn', 'python3-pip', 'emacs', 'tmux']:
  ensure  => installed,
  require => Exec['apt-upgrade'],
}
