<?php

namespace Dubco\Editor;

use Dubco\Admin\Settings;
use Dubco\Module;

class Gutenberg extends Module {

	/**
	 * @inheritDoc
	 */
	public function register() {

		$this->meta_fields_register_meta();

		add_action(
			'enqueue_block_editor_assets',
			function () {
				$supported_post_types = Settings::get_supported_post_types();

				if ( ! in_array( get_post_type(), $supported_post_types, true ) ) {
					return;
				}

				$api_key = Settings::get_api_key();

				if ( ! $api_key ) {
					return;
				}

				wp_enqueue_script(
					'dubco-gutenberg',
					DUBCO_PLUGIN_URL . 'dist/js/editor.js',
					[ 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-editor', 'wp-components', 'wp-data' ],
					filemtime( DUBCO_PLUGIN_PATH . 'dist/js/editor.js' ),
					true
				);
			}
		);
	}

	public function meta_fields_register_meta() {

		$metafields = [
			'_dubco_short_url',
			'_dubco_short_url_id',
			'_dubco_short_url_domain',
			'_dubco_short_url_error',
			'_dubco_workspace_slug',
		];

		foreach ( $metafields as $metafield ) {
			register_post_meta( '', $metafield, [
				'show_in_rest' => true,
				'type' => 'string',
				'single' => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			] );
		}
	}
}
