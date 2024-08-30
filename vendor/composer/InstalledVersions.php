<?php











namespace Composer;

use Composer\Autoload\ClassLoader;
use Composer\Semver\VersionParser;






class InstalledVersions
{
private static $installed = array (
  'root' => 
  array (
    'pretty_version' => 'dev-feature/first-commit',
    'version' => 'dev-feature/first-commit',
    'aliases' => 
    array (
    ),
    'reference' => '7acb048a5e7e17aa9460bc9ae2506b6246e5a0c5',
    'name' => '10up/wp-plugin',
  ),
  'versions' => 
  array (
    '10up/phpcs-composer' => 
    array (
      'pretty_version' => '3.0.0',
      'version' => '3.0.0.0',
      'aliases' => 
      array (
      ),
      'reference' => '04fe5f0d61948f9e38e9cd037a5ee50dcdbf4688',
    ),
    '10up/wp-plugin' => 
    array (
      'pretty_version' => 'dev-feature/first-commit',
      'version' => 'dev-feature/first-commit',
      'aliases' => 
      array (
      ),
      'reference' => '7acb048a5e7e17aa9460bc9ae2506b6246e5a0c5',
    ),
    'automattic/vipwpcs' => 
    array (
      'pretty_version' => '3.0.1',
      'version' => '3.0.1.0',
      'aliases' => 
      array (
      ),
      'reference' => '2b1d206d81b74ed999023cffd924f862ff2753c8',
    ),
    'dealerdirect/phpcodesniffer-composer-installer' => 
    array (
      'pretty_version' => 'v1.0.0',
      'version' => '1.0.0.0',
      'aliases' => 
      array (
      ),
      'reference' => '4be43904336affa5c2f70744a348312336afd0da',
    ),
    'haydenpierce/class-finder' => 
    array (
      'pretty_version' => '0.4.4',
      'version' => '0.4.4.0',
      'aliases' => 
      array (
      ),
      'reference' => '94c602870ddf8d4fa2d67fb9bae637d88f9bd76e',
    ),
    'nelson6e65/code-sniffer-helpers' => 
    array (
      'pretty_version' => 'v1.1.0',
      'version' => '1.1.0.0',
      'aliases' => 
      array (
      ),
      'reference' => 'a58c7cc5abae511a9ed974a509c9e47a2f2d67c8',
    ),
    'phpcompatibility/php-compatibility' => 
    array (
      'pretty_version' => 'dev-develop',
      'version' => 'dev-develop',
      'aliases' => 
      array (
        0 => '10.x-dev',
        1 => '9.99.99',
      ),
      'reference' => '2b7b6e8f5d0ccae3bd41c25bcf1298884a5e1f62',
    ),
    'phpcompatibility/phpcompatibility-paragonie' => 
    array (
      'pretty_version' => '1.3.3',
      'version' => '1.3.3.0',
      'aliases' => 
      array (
      ),
      'reference' => '293975b465e0e709b571cbf0c957c6c0a7b9a2ac',
    ),
    'phpcompatibility/phpcompatibility-wp' => 
    array (
      'pretty_version' => '2.1.5',
      'version' => '2.1.5.0',
      'aliases' => 
      array (
      ),
      'reference' => '01c1ff2704a58e46f0cb1ca9d06aee07b3589082',
    ),
    'phpcsstandards/phpcsextra' => 
    array (
      'pretty_version' => '1.2.1',
      'version' => '1.2.1.0',
      'aliases' => 
      array (
      ),
      'reference' => '11d387c6642b6e4acaf0bd9bf5203b8cca1ec489',
    ),
    'phpcsstandards/phpcsutils' => 
    array (
      'pretty_version' => '1.0.12',
      'version' => '1.0.12.0',
      'aliases' => 
      array (
      ),
      'reference' => '87b233b00daf83fb70f40c9a28692be017ea7c6c',
    ),
    'sirbrillig/phpcs-variable-analysis' => 
    array (
      'pretty_version' => 'v2.11.19',
      'version' => '2.11.19.0',
      'aliases' => 
      array (
      ),
      'reference' => 'bc8d7e30e2005bce5c59018b7cdb08e9fb45c0d1',
    ),
    'squizlabs/php_codesniffer' => 
    array (
      'pretty_version' => '3.10.2',
      'version' => '3.10.2.0',
      'aliases' => 
      array (
      ),
      'reference' => '86e5f5dd9a840c46810ebe5ff1885581c42a3017',
    ),
    'wimg/php-compatibility' => 
    array (
      'replaced' => 
      array (
        0 => '*',
      ),
    ),
    'wp-coding-standards/wpcs' => 
    array (
      'pretty_version' => '3.1.0',
      'version' => '3.1.0.0',
      'aliases' => 
      array (
      ),
      'reference' => '9333efcbff231f10dfd9c56bb7b65818b4733ca7',
    ),
  ),
);
private static $canGetVendors;
private static $installedByVendor = array();







public static function getInstalledPackages()
{
$packages = array();
foreach (self::getInstalled() as $installed) {
$packages[] = array_keys($installed['versions']);
}


if (1 === \count($packages)) {
return $packages[0];
}

return array_keys(array_flip(\call_user_func_array('array_merge', $packages)));
}









public static function isInstalled($packageName)
{
foreach (self::getInstalled() as $installed) {
if (isset($installed['versions'][$packageName])) {
return true;
}
}

return false;
}














public static function satisfies(VersionParser $parser, $packageName, $constraint)
{
$constraint = $parser->parseConstraints($constraint);
$provided = $parser->parseConstraints(self::getVersionRanges($packageName));

return $provided->matches($constraint);
}










public static function getVersionRanges($packageName)
{
foreach (self::getInstalled() as $installed) {
if (!isset($installed['versions'][$packageName])) {
continue;
}

$ranges = array();
if (isset($installed['versions'][$packageName]['pretty_version'])) {
$ranges[] = $installed['versions'][$packageName]['pretty_version'];
}
if (array_key_exists('aliases', $installed['versions'][$packageName])) {
$ranges = array_merge($ranges, $installed['versions'][$packageName]['aliases']);
}
if (array_key_exists('replaced', $installed['versions'][$packageName])) {
$ranges = array_merge($ranges, $installed['versions'][$packageName]['replaced']);
}
if (array_key_exists('provided', $installed['versions'][$packageName])) {
$ranges = array_merge($ranges, $installed['versions'][$packageName]['provided']);
}

return implode(' || ', $ranges);
}

throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}





public static function getVersion($packageName)
{
foreach (self::getInstalled() as $installed) {
if (!isset($installed['versions'][$packageName])) {
continue;
}

if (!isset($installed['versions'][$packageName]['version'])) {
return null;
}

return $installed['versions'][$packageName]['version'];
}

throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}





public static function getPrettyVersion($packageName)
{
foreach (self::getInstalled() as $installed) {
if (!isset($installed['versions'][$packageName])) {
continue;
}

if (!isset($installed['versions'][$packageName]['pretty_version'])) {
return null;
}

return $installed['versions'][$packageName]['pretty_version'];
}

throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}





public static function getReference($packageName)
{
foreach (self::getInstalled() as $installed) {
if (!isset($installed['versions'][$packageName])) {
continue;
}

if (!isset($installed['versions'][$packageName]['reference'])) {
return null;
}

return $installed['versions'][$packageName]['reference'];
}

throw new \OutOfBoundsException('Package "' . $packageName . '" is not installed');
}





public static function getRootPackage()
{
$installed = self::getInstalled();

return $installed[0]['root'];
}







public static function getRawData()
{
return self::$installed;
}



















public static function reload($data)
{
self::$installed = $data;
self::$installedByVendor = array();
}




private static function getInstalled()
{
if (null === self::$canGetVendors) {
self::$canGetVendors = method_exists('Composer\Autoload\ClassLoader', 'getRegisteredLoaders');
}

$installed = array();

if (self::$canGetVendors) {
foreach (ClassLoader::getRegisteredLoaders() as $vendorDir => $loader) {
if (isset(self::$installedByVendor[$vendorDir])) {
$installed[] = self::$installedByVendor[$vendorDir];
} elseif (is_file($vendorDir.'/composer/installed.php')) {
$installed[] = self::$installedByVendor[$vendorDir] = require $vendorDir.'/composer/installed.php';
}
}
}

$installed[] = self::$installed;

return $installed;
}
}
