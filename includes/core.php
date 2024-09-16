<?php
/**
 * Core plugin functionality.
 *
 * @package Dubco
 */

namespace Dubco\Core;

use Dubco\ModuleInitialization;
use Dubco\Plugin;
use Dubco\UpdateChecker;
use WP_Error;
use Dubco\Utility;


/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function ( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	new UpdateChecker();

	add_action( 'init', $n( 'i18n' ) );
	add_action( 'init', $n( 'init' ), apply_filters( 'dubco_plugin_init_priority', 8 ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' ) );
	add_action( 'wp_enqueue_scripts', $n( 'styles' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_styles' ) );

	// Hook to allow async or defer on asset loading.
	add_filter( 'script_loader_tag', $n( 'script_loader_tag' ), 10, 2 );

	do_action( 'tenup_plugin_loaded' );
}

/**
 * Registers the default textdomain.
 *
 * @return void
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'dubinc' );
	load_textdomain( 'dubinc', WP_LANG_DIR . '/dubinc/dubinc-' . $locale . '.mo' );
	load_plugin_textdomain( 'dubinc', false, plugin_basename( DUBCO_PLUGIN_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 *
 * @return void
 */
function init() {
	do_action( 'tenup_plugin_before_init' );

	// If the composer.json isn't found, trigger a warning.
	if ( ! file_exists( DUBCO_PLUGIN_PATH . 'composer.json' ) ) {
		add_action(
			'admin_notices',
			function () {
				$class = 'notice notice-error';
				/* translators: %s: the path to the plugin */
				$message = sprintf( __( 'The composer.json file was not found within %s. No classes will be loaded.', 'dubinc' ), DUBCO_PLUGIN_PATH );

				printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
			}
		);
		return;
	}

	ModuleInitialization::instance()->init_classes();
	do_action( 'dubco_plugin_init' );
}

/**
 * Activate the plugin
 *
 * @return void
 */
function activate() {
	// First load the init scripts in case any rewrite functionality is being loaded
	init();
	flush_rewrite_rules();
	if ( ! get_option( 'dubco_api_key' ) ) {
		set_transient( 'dubco_plugin_activated', true, 30 );
	}
}

add_action(
	'admin_init',
	function () {
		if ( get_transient( 'dubco_plugin_activated' ) ) {
			delete_transient( 'dubco_plugin_activated' );
			wp_safe_redirect( Plugin::get_settings_url() );
			exit;
		}
	}
);

/**
 * Deactivate the plugin
 *
 * Uninstall routines should be in uninstall.php
 *
 * @return void
 */
function deactivate() {
}


/**
 * The list of knows contexts for enqueuing scripts/styles.
 *
 * @return array
 */
function get_enqueue_contexts() {
	return [ 'admin', 'frontend', 'shared' ];
}

/**
 * Generate an URL to a script, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $script  Script file name (no .js extension)
 * @param string $context Context for the script ('admin', 'frontend', or 'shared')
 *
 * @return string|WP_Error URL
 */
function script_url( $script, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return new WP_Error( 'invalid_enqueue_context', 'Invalid $context specified in Dubco script loader.' );
	}

	return DUBCO_PLUGIN_URL . "dist/js/{$script}.js";
}

/**
 * Generate an URL to a stylesheet, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $stylesheet Stylesheet file name (no .css extension)
 * @param string $context    Context for the script ('admin', 'frontend', or 'shared')
 *
 * @return string URL
 */
function style_url( $stylesheet, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return new WP_Error( 'invalid_enqueue_context', 'Invalid $context specified in Dubco stylesheet loader.' );
	}

	return DUBCO_PLUGIN_URL . "dist/css/{$stylesheet}.css";
}

/**
 * Enqueue scripts for front-end.
 *
 * @return void
 */
function scripts() {

	wp_enqueue_script(
		'dubco_tracking_lead_plugin',
		'https://www.dubcdn.com/analytics/script.js',
		[],
		DUBCO_PLUGIN_VERSION,
		true
	);
}

/**
 * Enqueue scripts for admin.
 *
 * @return void
 */
function admin_scripts() {
}

/**
 * Enqueue styles for front-end.
 *
 * @return void
 */
function styles() {

	if ( is_admin() ) {
		wp_enqueue_style(
			'dubco_plugin_admin',
			style_url( 'admin', 'admin' ),
			[],
			Utility\get_asset_info( 'admin', 'version' ),
		);
	}
}

/**
 * Enqueue styles for admin.
 *
 * @return void
 */
function admin_styles() {

	wp_enqueue_style(
		'dubco_plugin_shared',
		style_url( 'shared', 'shared' ),
		[],
		Utility\get_asset_info( 'shared', 'version' ),
	);

	wp_enqueue_style(
		'dubco_plugin_admin',
		style_url( 'admin', 'admin' ),
		[],
		Utility\get_asset_info( 'admin', 'version' ),
	);
}

/**
 * Enqueue editor styles. Filters the comma-delimited list of stylesheets to load in TinyMCE.
 *
 * @param  string $stylesheets Comma-delimited list of stylesheets.
 * @return string
 */
function mce_css( $stylesheets ) {
	if ( ! empty( $stylesheets ) ) {
		$stylesheets .= ',';
	}

	return $stylesheets . DUBCO_PLUGIN_URL . ( ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ?
	'assets/css/frontend/editor-style.css' :
	'dist/css/editor-style.min.css' );
}

/**
 * Add async/defer attributes to enqueued scripts that have the specified script_execution flag.
 *
 * @link   https://core.trac.wordpress.org/ticket/12009
 * @param  string $tag    The script tag.
 * @param  string $handle The script handle.
 * @return string
 */
function script_loader_tag( $tag, $handle ) {
	$script_execution = wp_scripts()->get_data( $handle, 'script_execution' );

	if ( ! $script_execution ) {
		return $tag;
	}

	if ( 'async' !== $script_execution && 'defer' !== $script_execution ) {
		return $tag;
	}

	// Abort adding async/defer for scripts that have this script as a dependency. _doing_it_wrong()?
	foreach ( wp_scripts()->registered as $script ) {
		if ( in_array( $handle, $script->deps, true ) ) {
			return $tag;
		}
	}

	// Add the attribute if it hasn't already been added.
	if ( ! preg_match( ":\s$script_execution(=|>|\s):", $tag ) ) {
		$tag = preg_replace( ':(?=></script>):', " $script_execution", $tag, 1 );
	}

	return $tag;
}
