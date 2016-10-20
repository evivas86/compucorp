<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules

return array (
  'js' => 
  array (
    0 => 'ang/angularext.js',
    1 => 'ang/angularext/*.js',
    2 => 'ang/angularext/*/*.js',
	3 => 'ang/datatables/*.js',
  ),
  'css' => 
  array (
    0 => 'ang/angularext.css',
	1 => 'ang/angularext/*.css',
    2 => 'ang/angularext/*/*.css',
	3 => 'ang/datatables/*.css',
  ),
  'partials' => 
  array (
    0 => 'ang/angularext',
  ),
  'settings' => 
  array (
  ),
);