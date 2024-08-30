<?php

namespace Dubco\Dubco;

use Dubco\Api\ApiClient;
use Dubco\Module;

class Tracking extends Module {


	const COOKIE_NAME = 'dclid';

	/**
	 * @inheritDoc
	 */
	public function register() {
		add_action( 'user_register', [ $this, 'send_post_request_if_cookie_present' ], 10, 2 );
	}

	public function send_post_request_if_cookie_present( $user_id, array $user_data ) {
		if ( isset( $_COOKIE[ self::COOKIE_NAME ] ) ) {
			$cookie_value = sanitize_text_field( wp_unslash( $_COOKIE[ self::COOKIE_NAME ] ) );

			$api = ApiClient::get_instance();

			$response = $api->request(
				'POST',
				'/track/lead',
				[
					'clickId'       => $cookie_value,
					'customerId'    => (string) $user_id,
					'eventName'     => 'User Registration',
					'customerEmail' => $user_data['user_email'] ?? '',
					'customerName'  => $user_data['display_name'] ?? '',
				]
			);

			setcookie( self::COOKIE_NAME, '', time() - 3600, COOKIEPATH, COOKIE_DOMAIN );
		}
	}
}
