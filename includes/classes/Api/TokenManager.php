<?php

namespace Dubco\Api;

class TokenManager {
	private $access_token;
	private $refresh_token;

	public function __construct( $access_token = '', $refresh_token = '' ) {
		$this->access_token  = get_option(
			'dubco_access_token',
			$access_token
		);
		$this->refresh_token = get_option(
			'dubco_refresh_token',
			$refresh_token
		);
	}

	public function get_access_token() {
		return $this->access_token;
	}

	public function refresh_token(): string {

		$response = wp_remote_post(
			Oauth::OAUTH_ENDPOINT,
			[
				'body' => http_build_query([
					'grant_type'    => 'refresh_token',
					'client_id'     => Oauth::DUBCO_CLIENT_ID,
					'refresh_token' => $this->refresh_token,
				]),
				'headers' => [
					'Content-Type' => 'application/x-www-form-urlencoded;charset=UTF-8',
				]
			]
		);

		if ( is_wp_error( $response ) ) {
			$error_message = $response->get_error_message();
			wp_die( 'Message: ' . $error_message, 'Error when getting code', [ 'response' => 400 ] );
		}

		$http_code = wp_remote_retrieve_response_code( $response );
		$body      = wp_remote_retrieve_body( $response );
		if ( $http_code == 200 ) {
			// save the token to the options table
			$body = json_decode( $body );
			update_option( 'dubco_access_token', $body->access_token );
			update_option( 'dubco_refresh_token', $body->refresh_token );
			$this->access_token = $body->access_token;
			$this->refresh_token = $body->refresh_token;

			return $body->access_token;
		}

		throw new \Exception( 'Error refreshing token' );
	}
}
