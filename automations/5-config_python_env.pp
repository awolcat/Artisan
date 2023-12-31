#configures and activates python environment
#apply this manifest in artisan/, ie run as
#"sudo puppet apply /automations/config_python_env.pp"

package { ['python3', 'python3.8-venv']:
  ensure => installed,
}

exec { 'configure_python_env':
  command => 'python3 -m venv venv-artisan',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Package['python3'],
}

exec { 'activate_python_env':
  command => 'bash -c "source venv-artisan/bin/activate"',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Exec['configure_python_env'],
}

exec { 'install_dependencies':
  command => 'pip install -r requirements.txt',
  path    => '/usr/bin:/usr/sbin:/bin:/sbin',
  require => Exec['activate_python_env'],
}
