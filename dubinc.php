<?php
/**
 * Plugin Name:       Dub - Short Links With Superpowers
 * Description:       Official WordPress integration for Dub Technologies, Inc.
 * Version:           1.0.0
 * Requires at least: 4.9
 * Requires PHP:      7.4
 * Author:            Nicola Peluchetti
 * License:           AGPLv3
 * License URI:       https://www.gnu.org/licenses/agpl-3.0.en.html
 * Text Domain:       dubinc
 * Domain Path:       /languages
 *
 * @package           Dubco
 */

// Useful global constants.
define( 'DUBCO_PLUGIN_VERSION', '0.1.0' );
define( 'DUBCO_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'DUBCO_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'DUBCO_PLUGIN_INC', DUBCO_PLUGIN_PATH . 'includes/' );
define( 'DUBCO_PLUGIN_DIST_URL', DUBCO_PLUGIN_URL . 'dist/' );
define( 'DUBCO_PLUGIN_DIST_PATH', DUBCO_PLUGIN_PATH . 'dist/' );

$is_local_env = in_array( wp_get_environment_type(), [ 'local', 'development' ], true );
$is_local_url = strpos( home_url(), '.test' ) || strpos( home_url(), '.local' );
$is_local     = $is_local_env || $is_local_url;

// Require Composer autoloader if it exists.
if ( file_exists( DUBCO_PLUGIN_PATH . 'vendor/autoload.php' ) ) {
	require_once DUBCO_PLUGIN_PATH . 'vendor/autoload.php';
}

// Include files.
require_once DUBCO_PLUGIN_INC . '/utility.php';
require_once DUBCO_PLUGIN_INC . '/core.php';

// Activation/Deactivation.
register_activation_hook( __FILE__, '\Dubco\Core\activate' );
register_deactivation_hook( __FILE__, '\Dubco\Core\deactivate' );

// Bootstrap.
Dubco\Core\setup();
