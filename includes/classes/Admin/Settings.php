<?php

namespace DubTechnologiesInc\Admin;

use DubTechnologiesInc\Api\ApiClient;
use DubTechnologiesInc\Module;

class Settings extends Module {

	const API_KEY_OPTION = 'dubco_api_key';

	public static function get_supported_post_types() {
		$supported = get_option( 'dubco_selected_post_types', [ 'post', 'page' ] );
		if ( ! is_array( $supported ) ) {
			$supported = [ 'post', 'page' ];
		}

		return $supported;
	}

	public static function get_api_key() {
		return get_option( self::API_KEY_OPTION );
	}

	public function can_register() {
		return is_admin();
	}

	public function register() {
		add_action( 'admin_menu', [ $this, 'dubco_settings_page' ] );
		add_action(
			'admin_init',
			function () {
				register_setting( 'dubco-settings-group', 'dubco_selected_post_types' );
				register_setting( 'dubco-settings-group', self::API_KEY_OPTION );
				add_settings_section(
					'dubco_settings_section',
					__( 'Dub integrations settings', 'dubinc' ),
					null,
					'dubco-settings'
				);

				add_settings_field(
					'dubco_api_key',
					__( 'API Key', 'dubinc' ),
					[ $this, 'dubco_api_key_callback' ],
					'dubco-settings',
					'dubco_settings_section'
				);

				if ( static::get_api_key() ) {
					add_settings_field(
						'dubco_post_types',
						__( 'Which types of posts do you want Dub to automatically create short links for?', 'dubinc' ),
						[ $this, 'dubco_post_types_callback' ],
						'dubco-settings',
						'dubco_settings_section'
					);
				}
			}
		);
	}

	public function dubco_api_key_callback() {
		$api_key = get_option( self::API_KEY_OPTION );
		echo '<input type="text" name="' . esc_attr( self::API_KEY_OPTION ) . '" value="' . esc_attr( $api_key ) . '" placeholder="dub_xxxxxxxx" class="regular-text">';
		echo '<p class="description"><a href="https://dub.co/docs/api-reference/tokens#how-to-create-an-api-key" target="_blank">' . esc_html__( 'Here is how to create an API Key.', 'dubinc' ) . '</a></p>';
	}

	public function dubco_post_types_callback() {
		$selected_post_types = self::get_supported_post_types();
		$post_types          = get_post_types( [ 'public' => true ], 'objects' );
		echo '<div>';
		foreach ( $post_types as $post_type ) {
			$checked = in_array( $post_type->name, $selected_post_types, true ) ? 'checked' : '';
			echo '<div class="dubinc-checkbox"><label>';
			echo '<input type="checkbox" name="dubco_selected_post_types[]" value="' . esc_attr( $post_type->name ) . '" ' . esc_attr( $checked ) . '>';
			echo esc_html( $post_type->label );
			echo '</label></div>';
		}
		echo '</div>';
	}

	public function dubco_settings_page() {
		add_submenu_page(
			'options-general.php',
			__( 'Dub', 'dubinc' ),
			__( 'Dub', 'dubinc' ),
			'manage_options',
			'dubco-settings',
			[ $this, 'dubco_settings_page_html' ],
			20,
		);
	}

	public function dubco_settings_page_html() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		settings_errors( 'dubc_settings_messages' );

		?>
		<div class="wrap">
			<form action="options.php?action=dubco_save_options" method="post">
		<?php
		settings_fields( 'dubco-settings-group' );
		do_settings_sections( 'dubco-settings' );
		submit_button( __( 'Save Settings', 'dubinc' ) );
		?>
			</form>
		</div>
		<?php
	}
}
