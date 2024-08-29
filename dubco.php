<?php
/**
 * Plugin Name:       Dubco
 * Description:       Allow integration with dub.co
 * Version:           0.1.0
 * Requires at least: 4.9
 * Requires PHP:      7.2
 * Author:            10up
 * Author URI:        https://10up.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dubco-plugin
 * Domain Path:       /languages
 * Update URI:        https://github.com/10up/wp-scaffold
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
