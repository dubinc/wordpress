<?php

namespace Dubco;

use Dubco\Module;

class Plugin extends Module {

	public static function get_settings_url() {
		return add_query_arg(
			'page',
			'dubco-settings',
			admin_url( 'options-general.php' )
		);
	}

	/**
	 * @inheritDoc
	 */
	public function register() {
		$exploded = explode( '/', __DIR__ );
		$plugin_dir = $exploded[ count( $exploded ) - 3 ];

		add_filter(
			"plugin_action_links_{$plugin_dir}/dubinc.php",
			[ $this, 'plugin_action_links' ]
		);
	}

	public function plugin_action_links( $links ) {
		$settings_link = '<a href=' . esc_url( self::get_settings_url() ) . '>' . __( 'Settings', 'dubinc' )
						. '</a>';

		$links[] = $settings_link;

		return $links;
	}
}
